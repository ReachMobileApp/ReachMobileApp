import React from "react";
import { View, Text, Image, ProgressBarAndroid, ImageProps } from "react-native";


const Card = ({ image, header, subheader, rating, completionPercentage }: { 
    image: ImageProps; 
    header: string; 
    subheader: string; 
    rating: string; 
    completionPercentage: number;
}) => {
  
  return (
    <View className="mb-4 w-40 mx-2 rounded-md shadow-2xl">

      <Image source={image} className="w-full h-30 mb-1 rounded-t-lg" />
      <View className="rounded-b-lg bg-white h-24 px-2">

      <Text className="text-sm text-[#064d7d] mb-1">{header}</Text>
      <Text className="text-xs text-gray-600 mb-1">{subheader}</Text>
      <View className="flex-row justify-between mb-1">
        <Text className="mr-2">{rating}</Text>
        <Text className="ml-2">{`${completionPercentage}%`}</Text>
      </View>
        <ProgressBarAndroid style={{ flex: 1 }} styleAttr="Horizontal" indeterminate={false} progress={completionPercentage / 100} />
      </View>
    </View>
  );
};

export default Card;
