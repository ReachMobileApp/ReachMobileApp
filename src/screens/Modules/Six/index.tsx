import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Module from "@/src/components/Module";
import ModulesButtons from "@/src/components/ModulesButtons";
import Page from "@/assets/images/menuIcons/Page-1.png";
import Page2 from "@/assets/images/menuIcons/Page-2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

type ModuleScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};

const ModuleScreen = ({ navigation }: ModuleScreenProps) => {
    const [showVideo, setShowVideo] = useState(true);
    const [loading, setLoading] = useState(true);
    const [module, setModule] = useState<any>(null);

    const stripHtmlTags = (html: string): string => {
        return html.replace(/<[^>]*>/g, "");
    };

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const userInfo = await AsyncStorage.getItem("userInfo");
                if (userInfo) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    const token = parsedUserInfo.data.auth_token;

                    const response = await axios.get(
                        "https://uhfiles.ui.edu.ng/api/v1/courses/01j1bdmvf8wk0asczzbgx1c6yy/modules/01j1bdmw1vwh2k2stesa8p68jn",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setModule(response.data.data.currentModule);
                }
            } catch (error) {
                console.error("Error fetching module:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModule();
    }, []);

    const toggleVideoNotes = () => {
        setShowVideo((prev) => !prev);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    if (!module) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No module data found.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
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
            </View>

            {/* Main content */}
            <View className="bg-white flex-1">
                {showVideo ? (
                    <ScrollView>
                        <Module
                            header={module.name}
                            subheader={stripHtmlTags(
                                extractFirstParagraph(module.content)
                            )}
                            videoUrl={module.video} // Pass the correct video URL here
                            learningOutcomeHeader="Learning Outcome:"
                            learningOutcome={
                                "In this module, we will analyze: The opportunities and choices available for using remote consulting using the  Capability, Opportunity, and Motivation> Behavior. When you introduce remote consulting in your health-care work and to your team, you will meet resistance to this change. Using this framework will help you understand the resistance and how you can help people change what they do."
                            }
                        />
                        <View className="mb-10 p-2">
                            <TouchableOpacity onPress={toggleVideoNotes}>
                                <ModulesButtons
                                    image={showVideo ? Page : Page2}
                                    header={
                                        showVideo ? "Read Notes" : "Watch Video"
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("QuizScreenSix")
                                }>
                                <ModulesButtons
                                    image={Page2}
                                    header="Take Quiz"
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-1">
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                {module.name}
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                {stripHtmlTags(extractFirstParagraph(module.content))}
                            </Text>
                            
                        </View>
                        <ScrollView className="m-4 flex-1">
                            <View className="p-2">
                                <Text className="mb-3 text-[#183745] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="text-[#070707] mb-2 text-base">
                                        {" "}
                                        {stripHtmlTags(module.content)}
                                    </Text>
                                </View>
                            </View>
                            <View className="mb-10 p-2">
                                <TouchableOpacity onPress={toggleVideoNotes}>
                                    <ModulesButtons
                                        image={showVideo ? Page : Page2}
                                        header={
                                            showVideo
                                                ? "Read Notes"
                                                : "Watch Video"
                                        }
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("QuizScreenSix")
                                    }>
                                    <ModulesButtons
                                        image={Page2}
                                        header="Take Quiz"
                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>
        </View>
    );
};

const extractFirstParagraph = (html: string): string => {
    const match = html.match(/<p>(.*?)<\/p>/);
    return match ? match[1] : ""; // Return the content of the first <p> tag, or an empty string if not found
};

export default ModuleScreen;
