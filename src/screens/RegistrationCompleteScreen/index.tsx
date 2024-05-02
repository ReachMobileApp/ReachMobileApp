import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BackBtn } from "@/src/components/UI/Buttons/BackBtn";
import { Image } from "react-native";
import CelebrateImg from "@/assets/images/Component.png";
import { TextMedium16 } from "@/src/theme/typography";
import { CustomButton } from "@/src/components/UI/Buttons";
import { StackNavigationProps } from "@/src/shared";

const RegistrationCompleteScreen = ({ navigation }: StackNavigationProps) => {
  return (
    <View className="flex-1 flex h-full items-center bg-white px-4 pt-7">
      <View className="items-center">
        <Image source={CelebrateImg} className="w-[186px] h-[186px]" />
        <View className="mt-10">
          <Text className="text-[#064D7D] text-sm font-bold px-10">Your Sign Up was Successful</Text>
          <Text className="text-gray3">Your details has been stored into our Database {'\n'} 
NOTE: We'd make judicious use of your private data</Text>
        </View>
      </View>
      <View className="mt-40">
        <TouchableOpacity onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Home' })}  className="bg-[#064D7D] w-72  rounded-[20px]">
          <Text className="text-white text-center text-[16px] font-bold py-4">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistrationCompleteScreen;
