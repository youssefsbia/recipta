import {create} from 'zustand';
import axiosInstance from '../api/axiosInstance';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeState {
  recipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  searchRecipes: (search: String) => Promise<void>;
}

const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: [],
  fetchRecipes: async () => {
    try {
      const {data} = await axiosInstance.get('/recipes');
      set({recipes: data.recipes});
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  },
  searchRecipes: async (search: String) => {
    try {
      const {data} = await axiosInstance.get(`/recipes/search?q=${search}`);
      set({recipes: data.recipes});
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  },
}));

export default useRecipeStore;
