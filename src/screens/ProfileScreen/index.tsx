import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/image.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./../../config";
import Card from "@/src/components/BadgeCard";
import { useFocusEffect } from "@react-navigation/native";

type ApiResponse2 = {
    success: boolean;
    status: string;
    message: string;
    data: Array<{
        id: string;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
        facility_id: string;
        profile: {
            id: number;
            username: string;
            occupation: string;
            city: string;
            country: string;
            facility_id: string | null;
            user_id: string;
            created_at: string;
            updated_at: string;
        };
    }>;
};

type Module = {
    id: string;
    name: string;
    has_completed_quiz: boolean;
};

const ProfileScreen = ({ navigation }: any) => {
    const [selectedSection, setSelectedSection] = useState("aboutMe");
    const [userDetails, setUserDetails] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                const response = await axios.get<ApiResponse2>(
                    `${BASE_URL}user/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUserDetails(response.data.data[0]);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;
                setUserDetail(parsedUserInfo.data.user);

                const response = await axios.get<{ data: Module[] }>(
                    `${BASE_URL}courses/01j1bdmvf8wk0asczzbgx1c6yy/modules`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setModules(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching modules:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchModules();
            fetchProfile();
        }, [])
    );

    const handleSwitchChange = (value: boolean) => {
        setSelectedSection(value ? "aboutMe" : "badges");
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    return (
        <View className="flex-1">
            <View className="bg-[#064D7D] h-3/5">
                {/* Header */}
                <View className="flex-row justify-between items-center px-4 pt-6">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="flex items-center mt-10">
                    {/* Profile image */}
                    <Image source={Avatar} className="rounded-3xl" />

                    <Text className="text-white my-2 px-4 text-xl text-center font-bold">
                        {userDetails?.name}
                    </Text>
                    <Text className="text-white text-center font-bold text-sm">
                        {userDetails?.email}
                    </Text>
                    <Text className="text-green-500 text-center font-bold text-sm">
                        Active
                    </Text>
                </View>
                {/* Switch */}
                <View className="flex-row items-center justify-center mt-2">
                    <View className="flex-row items-center mt-6">
                        <TouchableOpacity
                            style={{
                                backgroundColor:
                                    selectedSection === "aboutMe"
                                        ? "#81b0ff"
                                        : "#ffffff",
                                padding: 10,
                                borderRadius: 20,
                                marginRight: 5,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => handleSwitchChange(true)}>
                            <Text
                                style={{
                                    color:
                                        selectedSection === "aboutMe"
                                            ? "#ffffff"
                                            : "#3e3e3e",
                                    fontWeight: "bold",
                                }}>
                                About Me
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor:
                                    selectedSection === "badges"
                                        ? "#81b0ff"
                                        : "#ffffff",
                                padding: 10,
                                borderRadius: 20,
                                marginLeft: 5,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => handleSwitchChange(false)}>
                            <Text
                                style={{
                                    color:
                                        selectedSection === "badges"
                                            ? "#ffffff"
                                            : "#3e3e3e",
                                    fontWeight: "bold",
                                }}>
                                Badges
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView className="mt-10 flex-1">
                {/* Conditional rendering based on selected section */}
                {selectedSection === "aboutMe" ? (
                    <View className="mt-4 gap-4">
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 pl-4 text-lg bg-[#064D7D]">
                                Name:
                            </Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.name}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">
                                Occupation:
                            </Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.occupation}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">
                                Email:
                            </Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.email}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">
                                Gender:
                            </Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.gender}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">
                                Years of Work:
                            </Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.years_of_work}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View className="mt-4">
                        {modules.length > 0 ? (
                            modules
                                .filter((module) => module.has_completed_quiz)
                                .map((module) => (
                                    <Card
                                        key={module.id}
                                        header={module.name}
                                        subheader="Completed"
                                    />
                                ))
                        ) : (
                            <Text className="text-center text-lg">
                                No badges earned yet.
                            </Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
