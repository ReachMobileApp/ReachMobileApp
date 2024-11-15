import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { StackNavigationProps } from "@/src/shared";

const ConfirmEmailScreen = ({ navigation }: StackNavigationProps) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className='text-2xl text-center font-bold text-[#064D7D]'>{'Email Verification'}</Text>
      ),
    });
  }, [navigation]);

  return (
    <View className="flex h-full items-center bg-white px-4 pt-7">
      <Text className="text-sm text-black font-semibold mt-5">Please verify your email by using the link sent to your email address</Text>
      <View className="mt-40">
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} className="bg-[#064D7D] w-72  rounded-[20px]">
          <Text className="text-white text-center text-[16px] font-bold py-4">Next</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.goBack()} className="text-center text-sm mt-9">Go Back</Text>
      </View>
    </View>
  );
};

export default ConfirmEmailScreen;
