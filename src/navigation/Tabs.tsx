import { TabView, SceneMap } from 'react-native-tab-view';
import RecipeListScreen from '../screens/RecipesListScreen';
import WishlistScreen from '../screens/WishlistScreen';

export default function Tabs() {
  return (
    <TabView
      navigationState={{ index: 0, routes: [{ key: 'recipes', title: 'Recipes' }, { key: 'wishlist', title: 'Wishlist' }] }}
      renderScene={SceneMap({
        recipes: RecipeListScreen,
        wishlist: WishlistScreen,
      })}
    />
  );
}