import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipesListScreen from './RecipesListScreen';
import WishlistScreen from './WishlistScreen';
import ProfilScreen from './ProfileScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const tabBarIcon = ({route}) => ({focused, color, size}) => {
  let iconName;

  if (route.name === 'Recipes') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Wishes') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'account' : 'account-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const HomeScreen = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Recipes"
      screenOptions={({route}) => ({
        tabBarIcon: tabBarIcon({route}),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'tomato',
        tabBarLabel: () => null,
        tabBarActiveBackgroundColor: 'tomato',
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTintColor: 'white',
        navigationOptions: {
          headerShown: false,
        },
      })}>
      <Tab.Screen
        name="Wishes"
        component={WishlistScreen}
        options={{title: t('wishlist')}}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesListScreen}
        options={{title: t('home')}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilScreen}
        options={{title: t('profile')}}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
