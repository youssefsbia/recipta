import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const RecipeItem = ({item, wishlist, onNavigate, onWishToggle}) => {
  return (
    <TouchableOpacity
      className="h-[154px] w-full mx-auto border-2 border-gray-200 rounded-xl relative "
      onPress={() => onNavigate(item.id)}>
      <ImageBackground
        source={{uri: item.image}}
        resizeMode="cover"
        className="h-[154px]">
        <View className="bg-slate-900 flex-row opacity-70 absolute bottom-0 w-full h-14">
          <View className="gap-2 p-1">
            <View>
              <Text className="font-semibold font-poppins text-white !opacity-100">
                {item.name}
              </Text>
              <Text className="font-semibold text-sm font-poppins text-white !opacity-100">
                Origin: {item.cuisine}
              </Text>
            </View>
          </View>
        </View>
        <View className="absolute bottom-3 right-2">
          <TouchableOpacity onPress={() => onWishToggle(item.id)}>
            <Icon
              className="text-xl"
              color={wishlist.includes(item.id) ? 'tomato' : 'white'}
              name={wishlist.includes(item.id) ? 'heart-fill' : 'heart'}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecipeItem;
