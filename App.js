import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DogBreeds from './components/DogBreeds';
import BreedDetails from './components/BreedDetails';
import DogFacts from './components/DogFacts';
import DogGroups from './components/DogGroups';

const queryClient = new QueryClient();

export default function App() {
  const [breedId, setBreedId] = useState(null); 

  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <DogBreeds setBreedId={setBreedId} />
      {breedId && <BreedDetails breedId={breedId} />}
      <View style={styles.infoContainer}>
        <DogFacts />
        <DogGroups />
      </View>
    </View>
  </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingTop: 20, 
    paddingBottom: 20 
  },
  infoContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: '100%', 
    padding: 10, 
  }
});


