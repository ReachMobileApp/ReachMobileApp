import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/src/components/ModuleCard";
import Image1 from "@/assets/images/image1.png";
import Image2 from "@/assets/images/image2.png";
// import UI from "@/assets/images/UI.png";
// import APHRC from "@/assets/images/aphrc.png";
// import KC from "@/assets/images/King's College.png";
// import sfuchas from "@/assets/images/sfuchas.png";
// import Taleguru from "@/assets/images/Taleguru.png";
// import UB from "@/assets/images/Uni Berm.png";
const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    

    return (
        <ScrollView className="flex-1 bg-white  pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("SideMenuNavigator", {
                                screen: "MenuScreen",
                            })
                        }
                        className="p-2">
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    {/* Notification icon */}
                    <TouchableOpacity
                        onPress={() => {
                            /* Add navigation logic for notifications */
                        }}
                        className="p-2">
                        <Ionicons
                            name="alarm-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <Text className="text-white mt-8 mb-4 px-4 text-xl font-bold">
                    Welcome to this training course!
                </Text>
            </View>

            {/* Main content */}
            <View className="bg-white ">
                {/* Add your content here */}
                {/* Cards section */}
                <View className=" mt-2">
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "Introduction",
                            })
                        }>
                        <Card
                            header="Introduction"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleOne",
                            })
                        }>
                        <Card
                            header="Module 1"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={60}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleTwo",
                            })
                        }>
                        <Card
                            header="Module 2"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={70}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleThree",
                            })
                        }>
                        <Card
                            header="Module 3"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={89}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleFour",
                            })
                        }>
                        <Card
                            header="Module 4"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={100}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleFive",
                            })
                        }>
                        <Card
                            header="Module 5"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleSix",
                            })
                        }>
                        <Card
                            header="Module 6"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "ModuleSeven",
                            })
                        }>
                        <Card
                            header="Module 7"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="1 hr"
                            completionPercentage={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
