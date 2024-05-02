import { StackNavigationProps } from '@/src/shared';
import React, { useLayoutEffect } from 'react'
import { View, Text ,TouchableOpacity, Image} from 'react-native'
import email from "@/assets/images/email.png";
import { CustomVerificationBox } from '@/src/components/UI/Inputs/CustomVerificationBox';
const CodeScreen= ({ navigation }: StackNavigationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className='text-2xl text-center font-bold text-[#064D7D]'>{'OTP Verification'}</Text>
      ),
    });
  }, [navigation]);
  return (
    <View className="flex-1 h-full w-full bg-white flex items-center pt-7">
        <Text className='text-gray3 mt-5 text-[15px] font-bold'>Enter the OTP that was sent to your mail or SMS</Text>
        <CustomVerificationBox />
      <View className="mt-24">
        <TouchableOpacity onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'ChangePasswordScreen' })}  className="bg-[#064D7D] w-72  rounded-[20px]">
          <Text className="text-white text-center text-[16px] font-bold py-4">Next</Text>
        </TouchableOpacity>
      </View>
      
      <View className='flex flex-row mt-5 items-center justify-between '>
        <Text>OTP Valid For 10 Minutes</Text>
      </View>
      
    </View>
  )
}

export default CodeScreen