import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import axiosInstance from '../api/axiosInstance';
import {useWishlistStore} from '../store/useWishlistStore';
import {useNavigation} from '@react-navigation/native';
import RecipeItem from '../components/RecipeItem';
import { useTranslation } from 'react-i18next';

const WishlistScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlistStore();
  const {t} = useTranslation();
  useEffect(() => {
    const fetchWishlistRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes');
        const wishlistRecipes = response.data.recipes.filter(recipe =>
          wishlist.includes(recipe.id),
        );
        setRecipes(wishlistRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlistRecipes();
  }, [wishlist]);

  const handleNavigate = (id: number) => {
    navigation.navigate('RecipeDetail', {id});
  };
  const handleWishlistToggle = (id: number) => {
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const renderItem = ({item}) => (
    <RecipeItem
      item={item}
      wishlist={wishlist}
      onNavigate={handleNavigate}
      onWishToggle={handleWishlistToggle}
    />
  );

  if (!recipes.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t('noWishesFound')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="p-4"
      data={recipes}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListHeaderComponent={() => <View className="h-6" />}
      ListFooterComponent={() => <View className="h-14" />}
    />
  );
};

export default WishlistScreen;
