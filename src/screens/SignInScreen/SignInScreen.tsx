import { View, Text, StatusBar,Image,TouchableOpacity } from "react-native";
import React from "react";
import {
  HeadingsSemibold24,
  InputAssistive,
  TextMedium14,
} from "@/src/theme/typography";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { CustomButton } from "@/src/components/UI/Buttons";
import { COLORS } from "@/src/theme/colors";
import { StackNavigationProps } from "@/src/shared";
import BaseNavigator from "@/src/navigations/BaseNavigator";
import Image1 from "@/assets/images/Group 57.png";
import face from "@/assets/images/face.png";
import github from "@/assets/images/github.png";
import google from "@/assets/images/google.png";
const SignInScreen = ({ navigation }: StackNavigationProps) => {
  return (
    
      <View className="flex-1 bg-white px-4 pt-2">
        <StatusBar
          backgroundColor={COLORS.white}
          barStyle={"dark-content"}
          animated
        />
        <View className="">
          <Image
            source={Image1}
            resizeMode="cover"
            className="mx-16 w-48 h-44"
          />
          <Text className="font-bold text-2xl text-center">Welcome Back!</Text>
          <View className="mt-5">
            <CustomPaperTextInput label="Email Address"  />
            <CustomPaperTextInput label="Password" />
            <InputAssistive
              text="Forgot Password?"
              customClassName="p-0 text-right"
               navigation={navigation} 
            />
          </View>
          <View className="flex mt-3 justify-center items-center">
            <View className="flex flex-row ">
              <Image
              source={github}
              resizeMode="cover"
              className="w-8 h-7" />
              <Image
              source={face}
              resizeMode="cover"
              className="w-8 h-8 mx-5" />
              <Image
              source={google}
              resizeMode="cover"
              className="w-8 h-8" />
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center">
            <TouchableOpacity className="text-center border-[#064D7D] bg-[#064D7D] rounded-[8px] px-10 mt-10 py-2 border w-32">
              <Text onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Home' })} className="text-white font-extrabold text-[16px]">Login</Text>
            </TouchableOpacity>
        </View>
      </View>
      
  );
};

export default SignInScreen;
