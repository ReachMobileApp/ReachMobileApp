// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import { BackBtn } from "@/src/components/UI/Buttons/BackBtn";
// import { Image } from "react-native";
// import CelebrateImg from "@/assets/images/Component.png";
// import { StackNavigationProps } from "@/src/shared";

// const RegistrationCompleteScreen = ({ navigation }: StackNavigationProps) => {
//   return (
//     <View className="flex-1 flex h-full items-center bg-white px-4 pt-7">
//       <View className="items-center">
//         <Image source={CelebrateImg} className="w-[186px] h-[186px]" />
//         <View className="mt-10">
//           <Text className="text-[#064D7D] text-sm font-bold px-10">Your Sign Up was Successful</Text>
//           <Text className="text-gray3">Your details has been stored into our Database {'\n'} 
// NOTE: We'd make judicious use of your private data</Text>
//         </View>
//       </View>
//       <View className="mt-40">
//         <TouchableOpacity onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Home' })}  className="bg-[#064D7D] w-72  rounded-[20px]">
//           <Text className="text-white text-center text-[16px] font-bold py-4">Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default RegistrationCompleteScreen;
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

const RegistrationCompleteScreen = ({ navigation }: StackNavigationProps) => {
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
          Alert.alert('Success', 'We have emailed your password reset link.')
          navigation.navigate('SignInScreen')
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
          <Text className="font-bold text-2xl text-center mt-5">Reset your Password Here</Text>
          <View className="mt-5">
            <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />

          </View>
        </View>
        <View className="w-full flex justify-center items-center ">
          <TouchableOpacity onPress={resetPassword} className={`w-full mt-10 h-14 rounded-[8px] justify-center items-center bg-[#064D7D]`}>
            <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Reset Password'}</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </>
  );
};

export default RegistrationCompleteScreen;
