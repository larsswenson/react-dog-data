import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchBreedDetails = async ({ queryKey }) => {
    const [, breedId] = queryKey;
    if (!breedId) {
        console.error('Breed ID is undefined, cannot fetch details');
        return;
    }
    const url = `https://dogapi.dog/api/v2/breeds/${breedId}`;
    console.log("Fetching from URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch breed details');
    }
    return response.json();
};

export default function BreedDetails({ breedId }) {
    console.log("BreedDetails component received breedId:", breedId); 
    
    const { data, isError, error, isPending } = useQuery({
        queryKey: ['breedDetails', breedId],
        queryFn: fetchBreedDetails,
        enabled: !!breedId 
    });

    if (isPending) return <Text>Loading breed details...</Text>;
    if (isError) return <Text>Error: {error.message}</Text>;

    if (!data || !data.data || !data.data.attributes) return <Text>No breed data available or data is incomplete</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.data.attributes.name}</Text>
            <Text>Description: {data.data.attributes.description}</Text>
            <Text>Life Span: {data.data.attributes.min_life} - {data.data.attributes.max_life} years</Text>
            <Text>Hypoallergenic: {data.data.attributes.hypoallergenic ? 'Yes' : 'No'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    }
});



  