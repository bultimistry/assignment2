import React from 'react'
import { View, Text, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>

        <Text style={styles.heading}>Profile Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    heading: {
        fontSize: 24, 
        fontWeight: 'bold', 
    },
});

export default ProfileScreen;