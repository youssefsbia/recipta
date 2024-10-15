import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={require('../assets/img/logo.png')} style={{ width: 100, height: 100 }} />
      <Text className="text-xl mt-4">Welcome to RecipeApp</Text>
    </View>
  );
};

export default SplashScreen;
