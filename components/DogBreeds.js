import React from 'react';
import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchDogBreeds = async () => {
  const response = await fetch('https://dogapi.dog/api/v2/breeds/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function DogBreeds({ setBreedId }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: fetchDogBreeds
  });

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => setBreedId(item.id)}>
          <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333333' }}>{item.attributes.name}</Text>
            <Text>{item.attributes.description}</Text>
            <Text>Hypoallergenic: {item.attributes.hypoallergenic ? 'Yes' : 'No'}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
    itemContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      backgroundColor: '#ffffff'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333'
    }
});

