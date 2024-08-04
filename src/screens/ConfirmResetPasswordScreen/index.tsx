import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@/src/config";

const ConfirmPasswordReset = ({ navigation }: StackNavigationProps) => {
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const verifyOtp = async () => {
    if (otp && password && confirmPassword) {
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Passwords do not match',
        });
        return;
      }

      setLoading(true);
      try {
        const email = await AsyncStorage.getItem('email');
        const response = await axios.post(`${BASE_URL}password/reset`, {
          email,
          otp,
          password,
          password_confirmation: confirmPassword
        });

        if (response.data.success) {
          Toast.show({
            type: 'success',
            text1: 'Success!',
            text2: 'Password updated successfully. Please log in.',
          });
          setLoading(false);
          navigation.navigate('SignInScreen');
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Invalid OTP or failed to update password',
          });
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error.response?.data?.message || error.message,
        });
        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please fill all fields',
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-5">
      <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} animated />
      <View>
        <CustomPaperTextInput label="OTP" value={otp} onChangeText={setOtp} />
        <CustomPaperTextInput label="New Password" value={password} onChangeText={setPassword}  />
        <CustomPaperTextInput label="Confirm New Password" value={confirmPassword} onChangeText={setConfirmPassword}  />
      </View>

      <View className="w-full flex justify-center items-center my-10">
        <TouchableOpacity onPress={verifyOtp} className={`w-full  h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}>
          <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Verify OTP'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ConfirmPasswordReset;
