import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Snackbar } from 'react-native-paper';

const FLICKR_API_URL = (page) => 
  `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${page}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [snackbarVisible, getSnackbarVisible] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        const cachedData = await AsyncStorage.getItem('cachedImages');
        if (cachedData) {
          setPhotos(JSON.parse(cachedData));
        }
      }
      const response = await axios.get(FLICKR_API_URL(pageNumber));
      const recentPhotos = response.data.photos.photo;
      
      if (pageNumber === 1) {
        setPhotos(recentPhotos);
        await AsyncStorage.setItem('cachedImages', JSON.stringify(recentPhotos));
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...recentPhotos]);
      }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      getSnackbarVisible(true);
    }
  };
  

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsPaginating(true);
    loadImages(page + 1).then(() => setIsPaginating(false));
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      {loading ? (
        <View style={styles.loader}>
         <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ):( 
        <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.url_s }} style={styles.image} />
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isPaginating && <ActivityIndicator size="small" color="#0000ff" />} />
      )}
     
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => getSnackbarVisible(false)}
        action={{
          label: 'Retry',
          onPress: () => {
            loadImages();
          },
        }}
      >
        Network Error. Retry?
      </Snackbar></View>
      
     

  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default HomeScreen;
