import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import axiosInstance from '../api/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {useWishlistStore} from '../store/useWishlistStore';
import RecipeItem from '../components/RecipeItem';
const RecipesListScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlistStore();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes');
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className="h-14 flex-row justify-center items-center border-2 border-gray-300 rounded-md px-2">
        <TextInput
          className="flex-1 text-lg"
          autoCorrect={true}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Icon name="search" color="#C1C1C1" size={30} />
      </View>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-6" />}
        ListHeaderComponent={() => <View className="h-6" />}
        ListFooterComponent={() => <View className="h-14" />}
      />
    </View>
  );
};

export default RecipesListScreen;
