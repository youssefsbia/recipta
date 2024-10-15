import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipesListScreen from './RecipesListScreen';
import WishlistScreen from './WishlistScreen';

const Tab = createBottomTabNavigator();

const tabBarIcon = ({route}) => ({focused, color, size}) => {
  let iconName;

  if (route.name === 'Recipes') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Wishlist') {
    iconName = focused ? 'heart' : 'heart-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Recipes" component={RecipesListScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
