import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "@/src/screens/OnboardingScreen";
import SignUpScreen from "@/src/screens/SignUpScreen/Index";
import ConfirmEmailScreen from "@/src/screens/ConfirmEmailScreen";
import RegistrationCompleteScreen from "@/src/screens/RegistrationCompleteScreen";
import SignInScreen from "@/src/screens/SignInScreen/index";
import Header from "@/src/components/UI/Header/Header";
import ChangePasswordScreen from "@/src/screens/ChangePasswordScreen";
import OtpVerificationScreen from "@/src/screens/OtpVerificationScreen";
import PasswordChangedScreen from "@/src/screens/PasswordChangedScreen";
import ResetPasswordScreen from "@/src/screens/ResetPasswordScreen";
import CodeScreen from "@/src/screens/OtpVerificationScreen/CodeScreen";


const AuthNavigator = () => {
  const Stack = createStackNavigator();
  // screenOptions={{ headerShown: false }}  headerBackVisible: false
  return (
    <Stack.Navigator >
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{title:''}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
            headerTitle: () => <Header name="REaCH" names="TRAINING" />,
            headerStyle: {
              backgroundColor: '#064D7D',
              height: 120
            },
            headerLeft: () => null, 
          }} />
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen}  options={{title:''}}/>

      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen}  options={{title:''}}/>
      <Stack.Screen name="PasswordChangedScreen" component={PasswordChangedScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}  options={{title:''}}/>
      <Stack.Screen name="CodeScreen" component={CodeScreen}  options={{title:''}}/>

      <Stack.Screen
        name="RegistrationCompleteScreen"
        component={RegistrationCompleteScreen}
        options={{title:''}}
      />
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{
            headerTitle: () => <Header name="REaCH" names="TRAINING" />,
            headerStyle: {
              backgroundColor: '#064D7D',
              height: 100
            },
            headerLeft: () => null, 
          }}  />        
    </Stack.Navigator>
  );
};

export default AuthNavigator;
