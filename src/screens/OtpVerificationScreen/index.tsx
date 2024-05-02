import { StackNavigationProps } from '@/src/shared';
import React, { useLayoutEffect } from 'react'
import { View, Text ,TouchableOpacity, Image} from 'react-native'
import email from "@/assets/images/email.png";
const OtpVerificationScreen= ({ navigation }: StackNavigationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className='text-2xl text-center font-bold text-[#064D7D]'>{'OTP Verification'}</Text>
      ),
    });
  }, [navigation]);
  return (
    <View className="flex-1 h-full w-full bg-white flex items-center pt-7">
       <Image
          source={email}
          resizeMode="cover"
          className="mx-16  w-60 h-52"
        />
        <Text className='text-gray3 mt-5 text-[15px] font-bold'>Check your Email</Text>
        <View className='flex justify-center items-center mt-8'>
          <Text className='text-gray3 text-[14px] font-medium'>Tap to confirm your Email Address, please tap</Text>
<Text className='text-gray3  text-[14px] font-medium'>the button in the Email we sent to: </Text>
<Text className='text-gray3 text-[14px] font-medium'>aje*********@gmail.com</Text>
        </View>
        <View className="mt-24">
        <TouchableOpacity onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'OtpVerificationScreen' })}  className="bg-[#064D7D] w-72  rounded-[20px]">
          <Text className="text-white text-center text-[16px] font-bold py-4">Open Email App</Text>
        </TouchableOpacity>
      </View>
      <View className='w-64 mt-3'>
      <View className='flex flex-row justify-between '>
        <Text>Resend Link
00:25</Text>
        <Text onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'CodeScreen' })}  className='text-[#064D7D] text-sm font-bold'>Manually Enter OTP</Text>
      </View>
      </View>
    </View>
  )
}

export default OtpVerificationScreen