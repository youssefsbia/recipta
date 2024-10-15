import React, { useState } from 'react';
import { View, TextInput, Alert, Image, TouchableHighlight, Text } from 'react-native';
import instance from '../api/axiosInstance';
import { useAuthStore } from '../store/useAuthStore';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const setTokens = useAuthStore((state) => state.setTokens);

  const handleLogin = async () => {
    try {
      const response = await instance.post('/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      // DummyJSON doesn't provide a refresh token, so we'll use a dummy one
      const refreshToken = 'dummyRefreshToken';

      setTokens(token, refreshToken);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="items-center mb-8">
        <Image source={require('../assets/img/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border-2 border-gray-300 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-2 border-gray-300 mb-4"
      />
      <TouchableHighlight className="bg-red-500" onPress={handleLogin} >
        <View className="p-4 bg-red-500 rounded-md items-center">
          <Text className="text-white">Login</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default LoginScreen;
