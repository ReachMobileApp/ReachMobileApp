import axios from "axios";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { COLORS } from "@/src/theme/colors";
import { StackNavigationProps } from "@/src/shared";
import Image1 from "@/assets/images/Group 57.png";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "./../../config";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

const ResetPasswordScreen = ({ navigation }: StackNavigationProps) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (email) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}password/email`, {
          email,
        });
        const user = response.data;
        if (response.data.success) {
          setLoading(false);
          // Toast.show({
          //   type: "success",
          //   text1: "Success!",
          //   text2: "success,We have emailed your password reset link.",
          // });
          showMessage({
            message: "success,We have emailed your password reset link.",
            type: "success",
            icon: "success",
            backgroundColor: COLORS.danger[600],
            statusBarHeight: 50,
          });
          AsyncStorage.setItem("email", email);
          navigation.navigate("ConfirmPasswordReset");
        } else {
          // setLoading(false);
          // Toast.show({
          //   type: "error",
          //   text1: "Error!",
          //   text2: response.data.message || "reset Failed",
          // });

          showMessage({
            message: response.data.message || "reset Failed",
            type: "danger",
            icon: "danger",
            backgroundColor: COLORS.danger[600],
            statusBarHeight: 50,
          });
        }
      } catch (error: any) {
        // Toast.show({
        //   type: "error",
        //   text1: "Error!",
        //   text2: error.response?.data?.message || error.message,
        // });

        showMessage({
          message: error.response?.data?.message || error.message,
          type: "danger",
          icon: "danger",
          backgroundColor: COLORS.danger[600],
          statusBarHeight: 50,
        });
        setLoading(false);
      }
    } else {
      // Toast.show({
      //   type: "error",
      //   text1: "Error!",
      //   text2: "Please fill all fields",
      // });
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
    }, [])
  );

  return (
    <>
      <ScrollView className='flex-1 bg-white  h-full'>
      <LinearGradient
        colors={["#064D7D", "#1E88E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reset Password</Text>
        </View>
      </LinearGradient>
        <View className='px-4 pt-6'>
          <Image
            source={Image1}
            resizeMode='cover'
            className='mx-16 w-48 h-44'
          />
          <Text className='font-bold text-2xl text-center mt-5'>
            Enter your email
          </Text>
          <View className='mt-5'>
            <CustomPaperTextInput
              label='Email Address'
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View className='w-full flex justify-center items-center px-4 '>
          <TouchableOpacity
            onPress={resetPassword}
            className={`w-full mt-10 h-14 rounded-[8px] justify-center items-center bg-[#064D7D]`}
          >
            <Text className='text-white font-extrabold text-2xl'>
              {loading ? <ActivityIndicator /> : "Get OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
})