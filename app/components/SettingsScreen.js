import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Setting Page</Text>

    </View>
  );
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
})

export default SettingsScreen