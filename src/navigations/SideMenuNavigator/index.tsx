import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "@/src/screens/MenuScreen";
import SettingsScreen from "@/src/screens/SettingsScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import BadgesScreen from "@/src/screens/Badges";

const SideMenuNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MenuScreen"
                component={MenuScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Badge"
                component={BadgesScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default SideMenuNavigator;
