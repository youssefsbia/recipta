import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to RecipeApp",
      login: "Login",
      username: "Username",
      password: "Password",
      recipes: "Recipes",
      wishlist: "Wishlist",
    },
  },
  // Add other languages if needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
