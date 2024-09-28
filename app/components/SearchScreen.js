import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SEARCH_API_URL = (query) => 
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${query}`;

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(SEARCH_API_URL(query));
      setResults(response.data.photos.photo);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Could not fetch search results.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search images (e.g., cat, dog)"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.url_s }} style={styles.image} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default SearchScreen;
