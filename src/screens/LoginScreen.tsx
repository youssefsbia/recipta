import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Image,
  TouchableHighlight,
  Text,
  ActivityIndicator,
} from 'react-native';
import instance from '../api/axiosInstance';
import {useAuthStore} from '../store/useAuthStore';
import {useTranslation} from 'react-i18next';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const setTokens = useAuthStore(state => state.setTokens);
  const {t} = useTranslation();
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password.');
        return;
      }
      setLoading(true);
      const response = await instance.post('/auth/login', {
        username,
        password,
      });

      const {token} = response.data;

      const refreshToken = 'dummyRefreshToken';

      setTokens(token, refreshToken);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="items-center mb-8">
        <Image
          source={require('../assets/img/logo.png')}
          alt="logo"
          className='w-32 h-32'
        />
      </View>
      <TextInput
        placeholder={t('username')}
        value={username}
        onChangeText={setUsername}
        className="border-2 border-gray-300 mb-4"
      />
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-2 border-gray-300 mb-4"
      />
      {loading ? (
        <ActivityIndicator size="large" className="text-red-300" />
      ) : (
        <TouchableHighlight className="bg-red-500" onPress={handleLogin}>
          <View className="p-4 bg-red-500 rounded-md items-center">
            <Text className="text-white">{t('login')}</Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default LoginScreen;
