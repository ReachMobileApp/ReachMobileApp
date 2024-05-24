import { View, Text, StatusBar,Image,TouchableOpacity, Pressable,ScrollView, ActivityIndicator } from "react-native";
import React, {useState} from "react";
import {
  HeadingsSemibold24,
  InputAssistive,
  TextMedium14,
} from "@/src/theme/typography";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { CustomButton } from "@/src/components/UI/Buttons";
import { COLORS } from "@/src/theme/colors";
import { StackNavigationProps } from "@/src/shared";
import BaseNavigator from "@/src/navigations/BaseNavigator";
import Image1 from "@/assets/images/Group 57.png";
import face from "@/assets/images/face.png";
import github from "@/assets/images/github.png";
import google from "@/assets/images/google.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message'
import { firebaseAuth } from "@/firebaseConfig";


const SignInScreen = ({ navigation }: StackNavigationProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  const SigninUser = async() => {
    if (email && password) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password).then((cred) => {
          if(cred.user.emailVerified === false){
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Error!',
              text2: 'Please verify your email address to login'
            });
          }else{
            setLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Success!',
              text2: 'Login Successful'
            });
            navigation.navigate('BottomTabNavigator',{ screen: 'Home' });
          }
        })
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error.message
        });
        setLoading(false);
      }
    }else{
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please fill all fields'
      });
    }
  }

  return (
    <>
      <View className="flex-1 bg-white px-4 pt-6">
        <StatusBar
          backgroundColor={COLORS.white}
          barStyle={"dark-content"}
          animated
        />
        <View className="">
          <Image
            source={Image1}
            resizeMode="cover"
            className="mx-16 w-48 h-44"
          />
          <Text className="font-bold text-2xl text-center mt-5">Welcome Back!</Text>
          <View className="mt-5">
            <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail}  />
            <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
            <Pressable onPress={()=>navigation.navigate('AuthNavigator',{ screen: 'ResetPasswordScreen' })}>
              <Text className="p-0 text-right font-medium text-[16px] leading-[16px] text-[#E13332] flex-shrink">Forgot Password? </Text>
            </Pressable>
          </View>
          <View className="flex mt-5 justify-center items-center">
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
        </View>
        <View className="flex justify-center items-center mb-10">
          <TouchableOpacity onPress={SigninUser} className="flex justify-center items-center border-[#064D7D] bg-[#064D7D] rounded-[8px] mt-10 py-2 border w-[42%]">
            <Text className="text-white font-extrabold text-xl">{loading ? <ActivityIndicator /> : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
  );
};

export default SignInScreen;
