import { StackNavigationProps } from '@/src/shared';
import React, { useLayoutEffect } from 'react'
import { View , Text, TextInput, TouchableOpacity,Image} from 'react-native'
import face from "@/assets/images/face.png";
import github from "@/assets/images/github.png";
import google from "@/assets/images/google.png";
const ChangePasswordScreen  = ({ navigation }: StackNavigationProps) => {
  return (
    <View className="flex-1 bg-[#064D7D] w-full h-full">
      <View className="flex-row justify-between items-center px-4 pt-12">
        
        
      </View>

      <View className="bg-white rounded-t-2xl h-full w-full mt-10 px-[10%]">
        <Text className='font-medium text-xl mt-5'>Change Your Password</Text>
        <View className='mt-10'>
          <View>
          <Text className='text-gray3 text-xl'>Enter New Password</Text>
          <TextInput className='border-b-2 border-gray3'/>
          </View>
          <View className='mt-16'>
          <Text className='text-gray3 text-xl'>Re-enter Password</Text>
          <TextInput className='border-b-2 border-gray3'/>
          </View>
        </View>
        <View className="flex justify-center my-20 items-center">
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
        <View className="w-full">
          <TouchableOpacity onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'PasswordChangedScreen' })}  className="bg-[#064D7D] w-[100%]  rounded-[20px]">
            <Text className="text-white text-center text-[16px] font-bold py-4">Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChangePasswordScreen