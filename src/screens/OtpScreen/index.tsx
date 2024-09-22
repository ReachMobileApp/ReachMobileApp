import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProps } from "@/src/shared";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/theme/colors";

const CELL_COUNT = 6;

const OtpScreen = ({ navigation, route }: StackNavigationProps) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [user, setUser] = useState({});
  const [email, setEmail] = useState<string | null>(null);
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      console.log('verify', code.toString());
    }
  }, [code]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      setEmail(value);
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const resendCode = async () => {
    if (!email) return;

    try {
      const response = await axios.post('https://uhfiles.ui.edu.ng/api/v1/email/resend-otp', { email });
      console.log(response.data);
      Alert.alert('Success', 'OTP Resent successfully');
      setCode('');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An error occurred while resending OTP');
    }
  };
  const verifyCode = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const verify = await axios.post('https://uhfiles.ui.edu.ng/api/v1/email/verify-otp', { email, otp: code.toString() });
      const user = verify.data;
      if (verify.status === 200) {
        console.log(verify.status);
        Alert.alert('Success', 'OTP Verified successfully');
        setUser(user);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        navigation.navigate('SignInScreen');
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("OTP is invalid")
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Verify OTP</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.instructions}>
          Please enter the 6-digit activation code sent to:
        </Text>
        <Text style={styles.email}>{email}</Text>

        <CodeField
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
          <Text style={styles.resendButtonText}>Resend verification code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={verifyCode} style={styles.verifyButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: "black",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#064d7d",
    marginBottom: 20,
  },
  codeFieldRoot: {
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 8,
  },
  cellRoot: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#064d7d",
    borderBottomWidth: 2,
    backgroundColor: "#f5f5f5",
  },
  cellText: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: "#064d7d",
    borderBottomWidth: 3,
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    color: "#064d7d",
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: "#064d7d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtpScreen;