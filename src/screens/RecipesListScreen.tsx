import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {useWishlistStore} from '../store/useWishlistStore';
import RecipeItem from '../components/RecipeItem';
import useRecipeStore from '../store/useRecipeStore';
import {debounce} from '../utils';
import {useTranslation} from 'react-i18next';

const RecipesListScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {recipes, fetchRecipes, searchRecipes} = useRecipeStore();
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlistStore();
  const {t} = useTranslation();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const searchRecipesList = (search: String) => {
    try {
      return searchRecipes(search);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchRecipesList, 500);

  const handleSearch = text => {
    setLoading(true);
    debouncedSearch(text);
  };

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

  return (
    <View className="p-4">
      <View className="h-14 flex-row justify-center items-center border-2 border-gray-300 rounded-md px-2">
        <TextInput
          className="flex-1 text-lg"
          autoCorrect={true}
          placeholder={t('search')}
          onChangeText={handleSearch}
        />
        <Icon name="search" color="#C1C1C1" size={30} />
      </View>
      {loading ? (
        <View className="h-full zflex-1 zjustify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : !recipes.length ? (
        <View className="flex-1 justify-center items-center">
          <Text>{t('noRecipesFound')}</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-6" />}
          ListHeaderComponent={() => <View className="h-6" />}
          ListFooterComponent={() => <View className="h-14" />}
        />
      )}
    </View>
  );
};

export default RecipesListScreen;
