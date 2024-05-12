// MenuScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/Avatar.png";
import Introduction from "@/assets/images/menuIcons/Introduction.png";
import Course from "@/assets/images/menuIcons/Course.png";
import Logout from "@/assets/images/menuIcons/Logout.png";
import Review from "@/assets/images/menuIcons/Review.png";
import Settings from "@/assets/images/menuIcons/settings.png";
import TrackProgress from "@/assets/images/menuIcons/TrackProgress.png";
import ArrowRight from "@/assets/images/menuIcons/arrowRight.png";
import ModuleScreen from "../ModuleScreen";
const MenuScreen = ({ navigation }: any) => {

  return (
    <View className="flex-1 bg-[#064D7D]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-6">
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        {/* Profile image */}
        <Image source={Avatar} className="w-8 h-8 rounded-full" />
      </View>

      <Text className="text-white mt-8 mb-4 px-4 text-xl font-bold">Hello, Musa!</Text>
      
      {/* Menu items */}
      <View className="bg-white rounded-t-2xl h-full mt-10">
        {/* Introduction */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300" onPress={()=>navigation.navigate('ModulesNavigator', { screen: 'Introduction' })}>
          <Image source={Introduction} className="w-3 h-3 mr-4" />
          <Text>Introduction</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Track Progress */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={TrackProgress} className="w-3 h-3 mr-4" />
          <Text>Track Progress</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Courses */}
        <TouchableOpacity onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Module' })}className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={Course} className="w-3 h-3 mr-4" />
          <Text>Courses</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Grades */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={TrackProgress} className="w-3 h-3 mr-4" />
          <Text>Grades</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity onPress={()=>navigation.navigate("Settings")} className="flex-row items-center px-4 py-6 border-b border-gray-300" >
                      <Image source={Settings} className="w-3 h-3 mr-4" />
          <Text>Settings</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

       

        {/* Logout */}
        <TouchableOpacity className="flex-row items-center px-4 py-6">
          <Image source={Logout} className="w-3 h-3 mr-4" />
          <Text>Logout</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;
