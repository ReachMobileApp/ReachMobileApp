import React from "react";
import { View, Text, Image, ProgressBarAndroid, ImageProps } from "react-native";
import Badge from "@/assets/images/menuIcons/Badge.png";

const Card = ({  header, subheader, duration }: { 
    header: string; 
    subheader: string; 
    duration: string; 
}) => {
  
  return (
    <View className="mb-4 w-full bg-white mx-1 px-1 py-3 flex flex-row ">

      <Image source={Badge} className="h-16 w-16" />
      <View className="flex w-9/12  px-3">

      <Text className="text-xl text-black  font-bold ">{header}</Text>
      <Text className="text-sm text-gray-600 ">{subheader}</Text>
     
        <Text className="text-sm text-red-600">{duration}</Text>
      </View>
    </View>
  );
};

export default Card;
