import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthNavigator from "./src/navigations/AuthNavigator";
import ModulesNavigator from "./src/navigations/ModulesNavigator";
import SideMenuNavigator from "./src/navigations/SideMenuNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
// import BaseNavigator from "./src/navigations/BaseNavigator";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          <Stack.Screen name="ModulesNavigator" component={ModulesNavigator} />
          <Stack.Screen name="SideMenuNavigator" component={SideMenuNavigator} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
          {/* <Stack.Screen name="BaseNavigator" component={BaseNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
