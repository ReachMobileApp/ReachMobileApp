import { StackNavigationProps } from "@/src/shared";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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
      console.log(value);
      setEmail(value);
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(email);
  const resendCode = async () => {
    if (!email) return;

    try {
      const response = await axios.post('https://uhfiles.ui.edu.ng/api/v1/email/resend-otp', { email });
      console.log(response.data);
      Alert.alert('Success', 'OTP Resent successfully');
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
        navigation.navigate('BottomTabNavigator', { screen: 'Home' });
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
      <Text style={styles.legal}>
        Please enter the 6-digit activation code sent to your <Text className="font-black text-lg">{email}</Text>.
      </Text>

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

      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={verifyCode} style={[styles.button, styles.verifyButton]}>
        <Text style={styles.verifyButtonText}>{loading ? <ActivityIndicator /> : 'Verify'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EFEEF6',
    gap: 20,
  },
  legal: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1063FD',
    fontSize: 18,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 4,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  verifyButton: {
    backgroundColor: '#1063FD',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default OtpScreen;
