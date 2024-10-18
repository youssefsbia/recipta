import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {useTranslation} from 'react-i18next';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);
const {t} = useTranslation();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require('../assets/img/logo.png')}
        style={{width: 100, height: 100}}
      />
      <Text className="text-xl mt-4">{t("welcome")}</Text>
    </View>
  );
};

export default SplashScreen;
