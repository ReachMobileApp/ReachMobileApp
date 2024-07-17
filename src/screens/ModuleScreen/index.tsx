import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Play from "@/assets/images/play.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video, ResizeMode } from 'expo-av';
import { BASE_URL } from './../../config';
import { decode } from 'html-entities';

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
    data: {
        data: Module[];
    };
}
const stripHtmlTags = (html: string): string => {
    // Decode HTML entities
    const decodedString = decode(html);

    // Remove HTML tags
    const cleanString = decodedString.replace(/<[^>]*>/g, '');

    const resultString = cleanString.replace(/&nbsp;/g, ' ');
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
    const extractFirstParagraph = (html: string): string => {
        const match = html.match(/<p>(.*?)<\/p>/);
        return match ? match[1] : ''; // Return the content of the first <p> tag, or an empty string if not found
    };
    

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
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

                console.log(response.data.data.data[0].modules);
                setModules(response.data.data.data[0].modules);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const handleModulePress = (moduleId: string) => {
        let screenName = '';
        console.log(moduleId)
        switch (moduleId) {
            case "01j1bdmvfg351qkw1fm6cgeq22":
                screenName = "ModuleOne";
                break;
            case "01j1bdmvrrsz7pbt3gmdz2fczt":
                screenName = "ModuleTwo";
                break;
            case "01j1bdmvvnrv7wv8v2b6q21kk8":
                screenName = "ModuleThree";
                break;
            case "01j1bdmvwaj2rs3v97bm7txvfk":
                screenName = "ModuleFour";
                break;
            case "01j1bdmvz1zatrjvb1wwvp8htt":
                screenName = "ModuleFive";
                break;
            case "01j1bdmw1vwh2k2stesa8p68jn":
                screenName = "ModuleSix";
                break;
            case "01j1bdmw52bw0jx6srb8qsm4h8":
                screenName = "ModuleSeven";
                break;
            default:
                screenName = "UnknownModule";
                break;
        }
        navigation.navigate("ModulesNavigator", {
            screen: screenName
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
        <ScrollView className="flex-1 bg-white pt-2">
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
            <View className="bg-white">
                <View className="mt-2">
                    {modules.map((module) => (
                        <TouchableOpacity
                            key={module.id}
                            onPress={() => handleModulePress(module.id)}
                            className="mb-4 mt-4 w-full bg-white border-b-2 mx-1 px-1 py-3 flex flex-row"
                        >
                           <Image source={Play} style={{ height: 100, width: 100 }} />
                            <View className="flex w-8/12 px-3">
                                <Text className="text-xl text-black font-bold">{module.name}</Text>
                                <Text className="text-sm text-gray-600">{stripHtmlTags(extractFirstParagraph(module.content))}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
