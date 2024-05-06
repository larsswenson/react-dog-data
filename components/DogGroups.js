import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchDogGroups = async () => {
  const response = await fetch('https://dogapi.dog/api/v2/groups/');
  if (!response.ok) {
      throw new Error('Failed to fetch dog groups');
  }
  const data = await response.json();
  await Promise.all(data.data.map(async group => {
      const breedPromises = group.relationships.breeds.data.map(async breed => {
          const breedResponse = await fetch(`https://dogapi.dog/api/v2/breeds/${breed.id}`);
          if (!breedResponse.ok) {
              throw new Error('Failed to fetch breed details');
          }
          const breedData = await breedResponse.json();
          return breedData.data.attributes.name;
      });
      group.breedNames = await Promise.all(breedPromises);
      return group;
  }));
  return data;
};

export default function DogGroups() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: fetchDogGroups
  });

  if (isPending) return <Text>Loading groups...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.title}>{item.attributes.name}</Text>
            <Text>Related Breeds:</Text>
            <FlatList
              data={item.breedNames}
              keyExtractor={(breedName, index) => index.toString()}
              renderItem={({ item: breedName }) => <Text>{breedName}</Text>}
            />
          </View>
        )}
      />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1, 
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  groupContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
