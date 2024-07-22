import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Play from "@/assets/images/play.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";
import { BASE_URL } from "./../../config";
import { decode } from "html-entities";

// Initialize Firestore

interface Module {
    id: string;
    name: string;
    description: string;
    video: string;
    content: string;
    image_url: string;
    modules: Module[];
}

interface ApiResponse {
    data: Module[];
}
const stripHtmlTags = (html: string): string => {
    // Decode HTML entities
    const decodedString = decode(html);

    // Remove HTML tags
    const cleanString = decodedString.replace(/<[^>]*>/g, "");

    const resultString = cleanString.replace(/&nbsp;/g, " ");
    return resultString;
};

const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<Module[]>([]);
    // const extractFirstParagraph = (html: string): string => {
    //     const match = html.match(/<p>(.*?)<\/p>/);
    //     return match ? match[1] : ''; // Return the content of the first <p> tag, or an empty string if not found
    // };

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
                console.log(response.data.data);
                setModules(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const handleModulePress = async (moduleId: string) => {
        try {
            await AsyncStorage.setItem("selectedModuleId", moduleId);
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
                            onPress={() => handleModulePress(module.id)}
                            className="mb-2  w-full bg-white mx-1 px-1 py-3 flex flex-row">
                            <Image
                                source={Play}
                                style={{ height: 80, width: 80 }}
                            />
                            <View className="flex w-8/12 px-3 text-center justify-center">
                                <Text className="text-xl text-black font-bold">
                                    {module.name}
                                </Text>
                                {/* <Text className="text-sm text-gray-600">{stripHtmlTags(module.content)}</Text> */}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ModuleScreen;
