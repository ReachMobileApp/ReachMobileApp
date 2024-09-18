import "react-native-gesture-handler";

import React from "react";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

import AuthNavigator from "./src/navigations/AuthNavigator";
import ModulesNavigator from "./src/navigations/ModulesNavigator";
import SideMenuNavigator from "./src/navigations/SideMenuNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <StatusBar backgroundColor='light' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='AuthNavigator' component={AuthNavigator} />
          <Stack.Screen name='ModulesNavigator' component={ModulesNavigator} />
          <Stack.Screen
            name='SideMenuNavigator'
            component={SideMenuNavigator}
          />
          <Stack.Screen
            name='BottomTabNavigator'
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <FlashMessage
        position='top'
        statusBarHeight={StatusBar.currentHeight}
        textStyle={{ fontSize: 20 }}
      />
    </PaperProvider>
  );
}
