import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "@/src/screens/OnboardingScreen";
import SignUpScreen from "@/src/screens/SignUpScreen/Index";
import ConfirmEmailScreen from "@/src/screens/ConfirmEmailScreen";
import RegistrationCompleteScreen from "@/src/screens/RegistrationCompleteScreen";
import SignInScreen from "@/src/screens/SignInScreen/index";
import Header from "@/src/components/UI/Header/Header";




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
