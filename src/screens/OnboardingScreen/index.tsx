import { View, Text, Image, StyleSheet,StatusBar,SafeAreaView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import React, { useLayoutEffect } from "react";
import { COLORS } from "@/src/theme/colors";
import { IconButton } from 'react-native-paper';
import Image1 from "@/assets/images/layer1.png";
import Image2 from "@/assets/images/Layer2.png";
import Image3 from "@/assets/images/layer3.png";
import { CustomButton } from "@/src/components/UI/Buttons";
import { StackNavigationProps } from "@/src/shared";

const OnboardingScreen = ({ navigation }: StackNavigationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={()=>navigation.navigate("SignInScreen")} className='mr-10 text-xl font-bold text-[#064D7D]'>{'Skip >>'}</Text>
      ),
    });
  }, [navigation]);
  return (
      <View className='flex-1 bg-white'>
    <View></View>
    <Swiper
      dot={
        <View
          style={{
            backgroundColor: 'gray',
            width: 35,
            height: 10,
            borderRadius: 7,
            marginLeft: 7,
            marginRight: 7
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: '#064D7D',
            width: 55,
            height: 10,
            borderRadius: 7,
            marginLeft: 7,
            marginRight: 7,
          }}
        />
      }
      paginationStyle={{
        bottom: 270
      }}
      loop={false}
    >
      <View className='flex-1 pt-2 relative'>
        <Image
          source={Image1}
          resizeMode="cover"
          className="mx-10 absolute top-5 z-20 w-60 h-52"
        />
        <View className='mx-9 mt-40 bg-[#2061C7]  flex justify-center border border-red-800 h-44 rounded-[50px] items-center z-10'>
          <Text className='text-[13px] text-center pt-10 text-white px-2'>Determining trustworthiness and safety of remote {'\n'} consulting in primary healthcare for chronic disease {'\n'} populations in Africa</Text>
        </View> 
        <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} >
     <View className='mt-40 h-11 bg-[#2061C7] w-[70%] mx-14 rounded-[50px]'><Text className='text-center text-[13px] text-white py-3'>Let's Get Started</Text></View>
    </TouchableOpacity>
      </View>
      <View className='flex-1 pt-2 relative'>
        <Image
          source={Image3}
          resizeMode="cover"
          className="mx-20 absolute top-2 z-20 w-56 h-56"
        />
        <View className='mx-9 mt-40 bg-[#2061C7]  flex justify-center border border-red-800 h-44 rounded-[50px] items-center z-10'>
          <Text className='text-[13px] text-center pt-10 text-white px-2'>Determining trustworthiness and safety of remote {'\n'} consulting in primary healthcare for chronic disease {'\n'} populations in Africa</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} >
        <View className='bg-[#2061C7] absolute right-0 top-40 rounded-full mr-3'>
          <IconButton iconColor='white'
        icon="arrow-right-thin"
      />
    </View>

        </TouchableOpacity>
      </View>
      <View className='flex-1 pt-5 '>
      <View className='mx-9  flex justify-center items-center z-10'>
          <Text className='text-[13px] text-center pt-10 text-black px-2'>Determining trustworthiness and safety of {'\n'} remote consulting in primary healthcare for {'\n'} chronic disease populations in Africa</Text>
        </View>
        <Image
          source={Image2}
          resizeMode="cover"
          className="mx-20 mt-10 w-52 h-52"
        />
      <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')} >
     <View className='mt-44 h-11 bg-[#2061C7] w-[70%] mx-14 rounded-[50px]'><Text className='text-center text-[13px] text-white py-3'>Start</Text></View>
    </TouchableOpacity>
      </View>
    </Swiper>
  </View>
  );
};

export default OnboardingScreen;
