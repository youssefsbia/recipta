import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useAuthStore} from '../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  const clearTokens = useAuthStore(state => state.clearTokens);
  const navigation = useNavigation();
  const {user, fetchUserProfile} = useAuthStore();
  const {t} = useTranslation();
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const logout = () => {
    clearTokens();
    navigation.replace('Login');
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: t('cancel'),
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: t('logout'),
          onPress: () => logout(),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t('loadingProfile')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-2 items-center">
        <Image className="w-64 h-64 rounded-full" source={{uri: user.image}} />
      </View>
      <Text className="mb-2">
        <Text className="font-bold font-poppins">{t('name')}:</Text> {user.firstName}{' '}
        {user.lastName}
      </Text>
      <Text className="mb-2">
        <Text className="font-bold font-poppins">{t('email')}:</Text> {user.email}
      </Text>
      {/* Add more user details as needed */}
      <Text className="mb-2">
        <Text className="font-bold font-poppins">{t('role')}:</Text> {user.role}
      </Text>
      <Text className="mb-2">
        <Text className="font-bold font-poppins">{t('phone')}:</Text> {user.phone}
      </Text>
      <TouchableHighlight className="bg-red-300 mt-6" onPress={handleLogout}>
        <View className="p-3 bg-red-500 rounded-md items-center">
          <Text className="text-white">{t('logout')}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ProfileScreen;
