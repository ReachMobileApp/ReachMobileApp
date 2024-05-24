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
      <View className='flex-1 bg-white h-full'>
    <View></View>
    <Swiper
      dot={
        <View
          style={{
            backgroundColor: 'gray',
            width: "11%",
            height: "2%",
            borderRadius: 7,
            marginLeft: "3%",
            marginRight: "3%",
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: '#064D7D',
            width: "11%",
            height: "2%",
            borderRadius: 7,
            marginLeft: "3%",
            marginRight: "3%",
          }}
        />
      }
      paginationStyle={{
        top: "10%"
      }}
      loop={false}
    >
      <View className='flex-1 pt-2 relative h-full w-full'>
        <Image
          source={Image1}
          resizeMode="cover"
          className="mx-[15%] absolute z-10 w-[63%] h-[30%]"
        />
        <View className='mx-[5%] mt-[45%] bg-[#2061C7]  flex justify-center border border-red-800 h-[18%]  rounded-full items-center'>
          <Text className='text-[13px] text-center pt-1 text-white px-2'>Determining trustworthiness and safety of remote {'\n'} consulting in primary healthcare for chronic disease {'\n'} populations in Africa</Text>
        </View> 
        <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} >
            <View className='mt-56 h-11 bg-[#2061C7] w-[70%] mx-14 rounded-[50px]'><Text className='text-center text-[13px] text-white py-3'>Let's Get Started</Text></View>
        </TouchableOpacity>
      </View>
      <View className='pt-2 relative h-full w-full'>
        
        <Image
          source={Image3}
          resizeMode="cover"
          className="mx-[30%] absolute z-10 w-[47%] h-[25%]"
        />
       
        <View className='mx-[10%] mt-[40%] bg-[#2061C7] flex justify-center border border-red-800 h-[15%] rounded-[50px] items-center'>
          <Text className='text-[13px] text-center pt-2 text-white px-2'>Determining trustworthiness and safety of remote {'\n'} consulting in primary healthcare for chronic disease {'\n'} populations in Africa</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} className='mt-[100%] mr-3  flex items-end justify-center' >
        <View className='w-14 bg-[#2061C7]  rounded-full'>
          <IconButton iconColor='white' icon="arrow-right-thin"/>
        </View>
        </TouchableOpacity>
      </View>
      <View className='flex-1 pt-5 w-full h-full'>
      <View className='mx-9 flex justify-center items-center'>
          <Text className='text-[13px] text-center pt-1 text-black px-2'>Determining trustworthiness and safety of {'\n'} remote consulting in primary healthcare for {'\n'} chronic disease populations in Africa</Text>
        </View>
        <Image
          source={Image2}
          resizeMode="cover"
          className="mx-[20%] mt-3 w-[60%] h-[35%]"
        />
      <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')} >
     <View className='mt-[80%] h-11 bg-[#2061C7] w-[70%] mx-14 rounded-[50px]'><Text className='text-center text-[13px] text-white py-3'>Start</Text></View>
    </TouchableOpacity>
      </View>
    </Swiper>
  </View>
  );
};

export default OnboardingScreen;
