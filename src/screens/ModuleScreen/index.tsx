import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./../../config";
import { decode } from "html-entities";
import { useFocusEffect } from "@react-navigation/native";

interface Module {
    id: string;
    name: string;
    description: string;
    video: string;
    content: string;
    image_url: string;
    modules: Module[];
    has_completed_quiz: boolean;
    has_user: boolean;
}

interface ApiResponse {
    data: Module[];
}

const stripHtmlTags = (html: string): string => {
    const decodedString = decode(html);
    const cleanString = decodedString.replace(/<[^>]*>/g, "");
    return cleanString.replace(/&nbsp;/g, " ");
};

const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<Module[]>([]);

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                const response = await axios.get<ApiResponse>(
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
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };


      useFocusEffect(
        useCallback(() => {
            fetchModules();
        }, [])
    );

    const handleModulePress = async (module: Module) => {
        if (!module.has_user) {
            Alert.alert(
                "Module Locked",
                "Please complete the previous modules to unlock this one.",
                [{ text: "OK" }]
            );
            return;
        }
    
        try {
            await AsyncStorage.setItem("selectedModuleId", module.id);
        } catch (error) {
            console.error("Error storing module ID:", error);
        }
        let screenName = "ModuleScreen";
    
        navigation.navigate("ModulesNavigator", {
            screen: screenName,
        });
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }



    return (
        <View className="flex-1 bg-white pt-2">
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("SideMenuNavigator", {
                                screen: "MenuScreen",
                            })
                        }
                        className="p-2">
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className="text-white mt-8 mb-4 px-4 text-xl font-bold">
                    Welcome to this training course!
                </Text>
            </View>
            <ScrollView className="bg-gray-200">
                <View className="mt-2">
                    {modules.map((module) => (
                        <TouchableOpacity
                            key={module.id}
                            onPress={() => handleModulePress(module)}
                            className={`mb-2 w-full bg-white mx-1 px-1 py-3 flex flex-row ${!module.has_user && 'opacity-50'}`}
                        >
                            <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons
                                    name={module.has_user ? "play-circle" : "lock-closed"}
                                    size={40}
                                    color={module.has_user ? "#064d7d" : "gray"}
                                />
                            </View>
                          <View className = "w-full justify-center">
                          <View className="flex w-8/12 px-3 text-center justify-between flex-row">
                                <Text className="text-xl text-black font-bold">
                                    {module.name}
                                </Text>
                                {module.has_completed_quiz && (
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color="green"
                                        style={{ marginLeft: 5 }}
                                    />
                                )}
                            </View>
                          </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ModuleScreen;