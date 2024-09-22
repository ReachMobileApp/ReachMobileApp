import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/src/config";
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";


const ConfirmPasswordReset = ({ navigation }: StackNavigationProps) => {
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const verifyOtp = async () => {
    if (otp && password && confirmPassword) {
      if (password !== confirmPassword) {
        // Toast.show({
        //   type: "error",
        //   text1: "Error!",
        //   text2: "Passwords do not match",
        // });

        showMessage({
          message: "Passwords do not match",
          type: "danger",
          icon: "danger",
          backgroundColor: COLORS.danger[600],
          statusBarHeight: 50,
        });
        return;
      }

      setLoading(true);
      try {
        const email = await AsyncStorage.getItem("email");
        const response = await axios.post(`${BASE_URL}password/reset`, {
          email,
          otp,
          password,
          password_confirmation: confirmPassword,
        });

        if (response.data.success) {
          // Toast.show({
          //   type: "success",
          //   text1: "Success!",
          //   text2: "Password updated successfully. Please log in.",
          // });
          showMessage({
            message: "Password updated successfully. Please log in.",
            type: "success",
            icon: "success",
            backgroundColor: COLORS.success[600],
            statusBarHeight: 50,
          });
          setLoading(false);
          navigation.navigate("SignInScreen");
        } else {
          setLoading(false);
          // Toast.show({
          //   type: "error",
          //   text1: "Error!",
          //   text2: "Invalid OTP or failed to update password",
          // });
          showMessage({
            message: "Invalid OTP or failed to update password",
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

  return (
    <ScrollView className='flex-1 bg-white '>
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
          <Text style={styles.headerTitle}>
            Confirm Password Reset </Text>
        </View>
      </LinearGradient>
      <View className="px-4 pt-5">
        <CustomPaperTextInput label='OTP' value={otp} onChangeText={setOtp} />
        <CustomPaperTextInput
          label='New Password'
          value={password}
          onChangeText={setPassword}
        />
        <CustomPaperTextInput
          label='Confirm New Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View className='w-full flex justify-center items-center my-10 px-4 '>
        <TouchableOpacity
          onPress={verifyOtp}
          className={`w-full  h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}
        >
          <Text className='text-white font-extrabold text-2xl'>
            {loading ? <ActivityIndicator /> : "Confirm "}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ConfirmPasswordReset;

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