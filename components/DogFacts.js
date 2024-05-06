import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchDogFacts = async () => {
    const response = await fetch('https://dogapi.dog/api/v2/facts/');
    if (!response.ok) {
      throw new Error('Failed to fetch dog facts');
    }
    return response.json();
  };
  
  export default function DogFacts() {
    const { data, isError, error, isLoading } = useQuery({
      queryKey: ['dogFacts'],
      queryFn: fetchDogFacts
    });
  
    if (isLoading) return <Text>Loading facts...</Text>;
    if (isError) return <Text>Error: {error.message}</Text>;
  
    return (
        <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.factContainer}>
            <Text>{item.attributes.body}</Text>
          </View>
        )}
      />
    );
  }

  const styles = StyleSheet.create({
    factContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginVertical: 5
    }
  });

  