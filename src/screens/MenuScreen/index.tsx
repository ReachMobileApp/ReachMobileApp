import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/image.png";
import Course from "@/assets/images/menuIcons/Course.png";
import Logout from "@/assets/images/menuIcons/Logout.png";
import TrackProgress from "@/assets/images/menuIcons/TrackProgress.png";
import ArrowRight from "@/assets/images/menuIcons/arrowRight.png";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/src/config";
import axios from "axios";

const MenuScreen = ({ navigation }: any) => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const SignOut = async () => {
        setLoading(true)
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;
                const response = await axios.post(
                    `${BASE_URL}logout`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }
                );
                if (response.status === 200) {
                    await AsyncStorage.removeItem("userInfo");
                    Toast.show({
                        type: "success",
                        text1: "Success!",
                        text2: "Logged out successfully",
                    });
                    navigation.navigate("SignInScreen");
                } else {
                    throw new Error('Logout failed');
                }
            }
        } catch (error) {
            console.error('Error logging out:', error);
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Failed to log out",
            });
        } finally {
            setLoading(false);
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("userInfo");
            if (value !== null) {
                const parsedData = JSON.parse(value);
                setUser(parsedData.data.user.name);
            }
        } catch (e) {
            console.error("Failed to fetch data from AsyncStorage", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View className="flex-1 bg-[#064D7D]">
            {/* Header */}
            <View className="flex-row justify-between items-center px-4 pt-6">
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()} className="">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                {/* Profile image */}
                <Image source={Avatar} className="w-8 h-8 rounded-full" />
            </View>

            <Text className="text-white mt-8 mb-4 px-4 text-xl font-bold">
                Hello, {user}{" "}
            </Text>

            {/* Menu items */}
            <View className="bg-white rounded-t-2xl h-full mt-10">
                {/* Courses */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("BottomTabNavigator", { screen: "Modules" })}
                    className="flex-row items-center px-4 py-6 border-b border-gray-300">
                    <Image source={Course} className="w-3 h-3 mr-4" />
                    <Text>Courses</Text>
                    <Image source={ArrowRight} className="ml-auto w-3 h-3" />
                </TouchableOpacity>

                {/* Grades */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("SideMenuNavigator", { screen: "Badge" })}
                    className="flex-row items-center px-4 py-6 border-b border-gray-300">
                    <Image source={TrackProgress} className="w-3 h-3 mr-4" />
                    <Text>Badges</Text>
                    <Image source={ArrowRight} className="ml-auto w-3 h-3" />
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity onPress={SignOut} className="flex-row items-center px-4 py-6">
                    <Image source={Logout} className="w-3 h-3 mr-4" />
                    <Text>Logout</Text>
                    <Image source={ArrowRight} className="ml-auto w-3 h-3" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MenuScreen;
