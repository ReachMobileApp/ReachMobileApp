import React from 'react'
import { View, Text,Image } from 'react-native'
import group from "@/assets/images/Group 447.png";
import { StackNavigationProps } from '@/src/shared';
const PasswordChangedScreen = ({ navigation }: StackNavigationProps) => {
  return (
    <View className="flex-1 h-full w-full bg-white flex items-center pt-7">
       <Image
          source={group}
          resizeMode="cover"
          className="w-60 h-64"
        />
        <Text className='text-xs text-[#064D7D] mt-5'>Your Password was changed Successful</Text>
        <View className='flex justify-center items-center mt-8'>
<Text className='text-gray3  text-[14px] font-medium'>Your details has been stored into our Database</Text>
<Text className='text-gray3 text-[14px] font-medium'>
NOTE: We'd make judicious use of your private data</Text>
        </View>
        <Text onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Home' })} className='mt-16 text-sm font-bold text-[#064D7D] border-b border-[#064D7D]'>Continue to Home</Text>
    </View>
  )
}

export default PasswordChangedScreen