import axios from 'axios';
import { View, Text, StatusBar, Image, TouchableOpacity, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { COLORS } from "@/src/theme/colors";
import { StackNavigationProps } from "@/src/shared";
import Image1 from "@/assets/images/Group 57.png";
import Toast from 'react-native-toast-message'
import { BASE_URL } from './../../config';
import { useFocusEffect } from '@react-navigation/native';

const ResetPasswordScreen = ({ navigation }: StackNavigationProps) => {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);


  const resetPassword = async () => {
    if (email) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}password/email`, {
          email
        });
        const user = response.data;
        if (response.data.success) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Success!',
            text2: 'success,We have emailed your password reset link.'
          });
          AsyncStorage.setItem('email', email);
          navigation.navigate('ConfirmPasswordReset');
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: response.data.message || 'reset Failed'
          });
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error.response?.data?.message || error.message
        });
        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please fill all fields'
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');

    }, [])
  );

  return (
    <>
      <ScrollView className="flex-1 bg-white px-4 pt-6 h-full">
        <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} animated />
        <View className="">
          <Image source={Image1} resizeMode="cover" className="mx-16 w-48 h-44" />
          <Text className="font-bold text-2xl text-center mt-5">Enter your email</Text>
          <View className="mt-5">
            <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />

          </View>
        </View>
        <View className="w-full flex justify-center items-center ">
          <TouchableOpacity onPress={resetPassword} className={`w-full mt-10 h-14 rounded-[8px] justify-center items-center bg-[#064D7D]`}>
            <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Get OTP'}</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </>
  );
};

export default ResetPasswordScreen;