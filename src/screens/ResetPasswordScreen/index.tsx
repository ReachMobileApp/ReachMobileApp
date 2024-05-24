import CustomPaperTextInput from '@/src/components/UI/Inputs/CustomPaperTextInput';
import { StackNavigationProps } from '@/src/shared';
import React, { useLayoutEffect } from 'react'
import { View,Text,TouchableOpacity } from 'react-native'

const ResetPasswordScreen = ({ navigation }: StackNavigationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className='text-2xl text-center font-bold text-[#064D7D]'>{'Reset Password'}</Text>
      ),
    });
  }, [navigation]);
  return (
    <View className="flex-1 h-full w-full bg-white px-[5%] pt-7">
      <Text className='mt-10 mb-5'>Enter your Email Address below:</Text>
      <CustomPaperTextInput label=" " />
      <View className='flex justify-center items-center'>
      <Text className="text-gray3 mt-10 text-[12px]">forgot your Password? Don't worry we got you covered. Follow</Text> 
      <Text className='text-gray3 text-[12px]'>the steps below to get your account recovered for you:</Text>
      <Text className='text-gray3 mt-5 text-[12px]'>Note: It'll only take about 2 minutes</Text>
      </View>
      <View className="mt-24">
        <TouchableOpacity onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'OtpVerificationScreen' })}  className="bg-[#064D7D] w-[100%]  rounded-[20px]">
          <Text className="text-white text-center text-xl font-bold py-4">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ResetPasswordScreen