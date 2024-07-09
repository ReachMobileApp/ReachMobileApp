import { StackNavigationProps } from '@/src/shared';
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import email from "@/assets/images/email.png";

const OtpVerificationScreen = ({ navigation }: StackNavigationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className='text-2xl text-center font-bold text-[#064D7D]'>{'OTP Verification'}</Text>
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1 h-full w-full bg-white flex items-center pt-7 px-6">
      <Image
        source={email}
        resizeMode="cover"
        className="w-60 h-52"
      />
      <Text className='text-gray-600 mt-5 text-lg font-bold'>Check your Email</Text>
      <View className='flex justify-center items-center mt-8'>
        <Text className='text-gray-500 text-center text-base font-medium'>
          The reset instructions have been sent to the email you provided.
        </Text>
        <Text className='text-gray-500 text-center text-base font-medium'>
          You can proceed to login from there.
        </Text>
      </View>
      <Text className='text-red-600 text-md mt-4 font-medium text-center'>
        Note: You must have provided a valid email address associated with this account!
      </Text>
      <View className="mt-24 w-full items-center">
        <Text className='text-red-600 text-lg font-medium text-center'>
          Didn't receive the email?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AuthNavigator', { screen: 'ResetPasswordScreen' })} className="mt-3">
          <Text className="text-gray-600 text-center text-xl font-bold py-2 underline">
            Resend Email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OtpVerificationScreen;
