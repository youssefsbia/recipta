import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import axiosInstance from '../api/axiosInstance';

const RecipeDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="p-4">
      <Image source={{ uri: recipe.image }} alt={recipe.name} style={{ height: 300 }} />
      <Text className="text-2xl font-bold mt-5">{recipe.name}</Text>
      <Text className="mt-4">{recipe.cuisine}</Text>
    </View>
  );
};

export default RecipeDetailScreen;
