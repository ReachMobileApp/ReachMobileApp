// MenuScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/Avatar.png";
import Introduction from "@/assets/images/menuIcons/person.png";
import Course from "@/assets/images/menuIcons/Course.png";
import Privacy from "@/assets/images/menuIcons/notifications_none.png";
import Review from "@/assets/images/menuIcons/not_listed_location.png";
import Settings from "@/assets/images/menuIcons/support_agent.png";
import TrackProgress from "@/assets/images/menuIcons/enhanced_encryption.png";
import ArrowRight from "@/assets/images/menuIcons/arrowRight.png";

const SettingsScreen= ({ navigation }: any) => {


  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-6">
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
      </View>

       
      <View className="bg-white rounded-t-2xl h-full mt-10 shadow-lg border-2 border-gray-300 ">
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")}  className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={Introduction} className="w-3 h-3 mr-4" />
          <Text >Account</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Track Progress */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={TrackProgress} className="w-3 h-3 mr-4" />
          <Text>Change Password</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Courses */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={Privacy} className="w-3 h-3 mr-4" />
          <Text>Push Notification</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Grades */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={TrackProgress} className="w-3 h-3 mr-4" />
          <Text>Privacy</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300" >
          <Image source={Settings} className="w-3 h-3 mr-4" />
          <Text>Help and Support</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

        {/* Reviews */}
        <TouchableOpacity className="flex-row items-center px-4 py-6 border-b border-gray-300">
          <Image source={Review} className="w-3 h-3 mr-4" />
          <Text>About</Text>
          <Image source={ArrowRight} className="ml-auto w-3 h-3" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default SettingsScreen;
