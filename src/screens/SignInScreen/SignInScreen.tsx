import axios from "axios";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { COLORS } from "@/src/theme/colors";
import { StackNavigationProps } from "@/src/shared";
import Image1 from "@/assets/images/Group 57.png";
import Toast from "react-native-toast-message";
import { BASE_URL } from "./../../config";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = ({ navigation }: StackNavigationProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const SigninUser = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}login`, {
          email,
          password,
        });
        const user = response.data;
        console.log(user);
        if (response.status === 200) {
          setLoading(false);
          showMessage({
            message: "Login Successful",
            type: "success",
            icon: "success",
            backgroundColor: COLORS.success[600],
            statusBarHeight: 50,
          });
          setUser(user);
          await AsyncStorage.setItem("userInfo", JSON.stringify(user));
          navigation.navigate("BottomTabNavigator", { screen: "Home" });
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            console.log("not verified");
            // Toast.show({
            //   type: "error",
            //   text1: "Error!",
            //   text2: error.response.data.message,
            // });
            showMessage({
              message: error.response.data.message,
              type: "danger",
              icon: "danger",
              backgroundColor: COLORS.danger[600],
              statusBarHeight: 50,
            });
            setUser(user);
            await AsyncStorage.setItem("email", email); // Save email separately
            navigation.navigate("OtpScreen");
          } else if (error.response.status === 400) {
            showMessage({
              message: error.response.data.message,
              type: "danger",
              icon: "danger",
              backgroundColor: COLORS.danger[600],
              statusBarHeight: 50,
            });
          } else {
            console.log("An unexpected error occurred:", error.message);
          }
        } else {
          console.log("An unexpected error occurred: ", error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      showMessage({
        message: "Please fill all fields",
        type: "danger",
        icon: "danger",
        backgroundColor: COLORS.danger[600],
        statusBarHeight: 50,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView className='flex-1 bg-white px-4 pt-6 h-full'>
        {/* <StatusBar
          backgroundColor={COLORS.white}
          barStyle={"dark-content"}
          animated
        /> */}
        <View className=''>
          <Image
            source={Image1}
            resizeMode='cover'
            className='mx-16 w-48 h-44'
          />
          <Text className='font-bold text-2xl text-center mt-5'>
            Welcome Back!
          </Text>
          <View className='mt-5'>
            <CustomPaperTextInput
              label='Email Address'
              value={email}
              onChangeText={setEmail}
            />
            <CustomPaperTextInput
              label='Password'
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => navigation.navigate("ResetPasswordScreen")}
            >
              <Text className='p-0 text-right text-sm leading-[16px] text-[#0F172B] flex-shrink pt-5'>
                Forgot Password?{" "}
              </Text>
            </Pressable>
          </View>
        </View>
        <View className='w-full flex justify-center items-center '>
          <TouchableOpacity
            onPress={SigninUser}
            className={`w-full mt-10 h-14 rounded-[8px] justify-center items-center bg-[#064D7D]`}
          >
            <Text className='text-white font-extrabold text-2xl'>
              {loading ? <ActivityIndicator /> : "Login"}
            </Text>
          </TouchableOpacity>
          <Text className='text-left mt-2 text-base'>
            Don't have an account?{" "}
            <Text
              className='underline'
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

// if (email && password) {
//   setLoading(true);
//   try {
// const response = await axios.post(`${BASE_URL}login`, {
//   email,
//   password
// });
//     const user = response.data;
//     if (response.data.success) {
//       setLoading(false);
// Toast.show({
//   type: 'success',
//   text1: 'Success!',
//   text2: 'Login Successful'
// });
// setUser(user);
// await AsyncStorage.setItem('userInfo', JSON.stringify(user));
// navigation.navigate('BottomTabNavigator', { screen: 'Home' });
//     } else if(response.data.) {
//       setLoading(false);
//       Toast.show({
//         type: 'error',
//         text1: 'Error!',
//         text2: response.data.message || 'Login Failed'
//       });
//     }
//   } catch (error: any) {
//     Toast.show({
//       type: 'error',
//       text1: 'Error!',
//       text2: error.response?.data?.message || error.message
//     });
//     setLoading(false);
//   }
// } else {
//   Toast.show({
//     type: 'error',
//     text1: 'Error!',
//     text2: 'Please fill all fields'
//   });
// }
