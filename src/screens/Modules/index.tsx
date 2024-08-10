import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Module from "@/src/components/Module";
import ModulesButtons from "@/src/components/ModulesButtons";
import Page from "@/assets/images/menuIcons/Page-1.png";
import Page2 from "@/assets/images/menuIcons/Page-2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import { decode } from "html-entities";
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';

type ModuleScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};

const ModuleScreen = ({ navigation }: ModuleScreenProps) => {
    const [showVideo, setShowVideo] = useState(true);
    const [loading, setLoading] = useState(true);
    const [module, setModule] = useState<any>(null);
    const [videoFinished, setVideoFinished] = useState(false);

    const stripHtmlTags = (html: string): string => {
        const decodedString = decode(html);
        const cleanString = decodedString
            .replace(/<\/p>/g, "\n\n")
            .replace(/<[^>]*>/g, "");
        const resultString = cleanString.replace(/&nbsp;/g, " ");
        return resultString;
    };

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const userInfo = await AsyncStorage.getItem("userInfo");
                const selectedModuleId = await AsyncStorage.getItem("selectedModuleId");
                if (userInfo && selectedModuleId) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    const token = parsedUserInfo.data.auth_token;
                    const moduleId = selectedModuleId;
                    const response = await axios.get(
                        `${BASE_URL}modules/${moduleId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setModule(response.data.data);
                    setVideoFinished(response.data.data.has_completed_quiz);
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


    const handleVideoFinish = () => {
        setVideoFinished(true);
    };

    const isQuizButtonEnabled = videoFinished || (module && module.has_completed_quiz);

    const handleQuizPress = () => {
        if (!isQuizButtonEnabled) {
            Alert.alert(
                "Quiz Locked",
                "Please complete the video before taking the quiz.",
                [{ text: "OK" }]
            );
            return;
        }
        navigation.navigate("QuizScreen");
    };

    const requestFileWritePermission = async () => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
            Alert.alert("Permission Denied", "File write permission is required to download files.");
            return { access: false, directoryUri: null };
        }
        return { access: true, directoryUri: permissions.directoryUri };
    };

    const downloadFile = async (url: string, noteIndex: number) => {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const base64Data = Buffer.from(response.data).toString('base64');
            const hasPermissions = await requestFileWritePermission();
            if (hasPermissions.access) {
                await saveReportFile(base64Data, hasPermissions.directoryUri || "", noteIndex);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            Alert.alert("Download error", "There was an error downloading the file.");
        }
    };

    const saveReportFile = async (base64Data: string, directoryUri: string, noteIndex: number) => {
        try {
            const moduleName = module?.name.replace(/[^a-zA-Z0-9]/g, '_') || 'download';
            const fileName = `${moduleName}_note${noteIndex + 1}.pdf`;
            const fileUri = await StorageAccessFramework.createFileAsync(directoryUri, fileName, 'application/pdf');

            await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

            Alert.alert("Success", `File downloaded as ${fileName}`);
        } catch (error: any) {
            console.error("Error saving file:", error);
            Alert.alert("Error", `Could not save file: ${error.message}`);
        }
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
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center py-3 mb-2 px-3">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white flex-1">
                {showVideo ? (
                    <ScrollView>
                        <Module
                            header={module.name}
                            subheader={stripHtmlTags(extractFirstParagraph(module.content))}
                            videoUrl={module.video}
                            onVideoFinish={handleVideoFinish}
                        />
                        <View className="mb-10 p-2">
                            <TouchableOpacity onPress={toggleVideoNotes}>
                                <ModulesButtons
                                    image={showVideo ? Page : Page2}
                                    header={showVideo ? "Read Notes" : "Watch Video"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                 onPress={handleQuizPress}
                            >
                                <ModulesButtons image={Page2} header="Take Quiz" />
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
                                        {stripHtmlTags(module.content)}
                                    </Text>
                                </View>
                                {module.notes && module.notes.map((note: any, index: number) => (
                                    <TouchableOpacity
                                        key={note.id}
                                        onPress={() => downloadFile(note.note, index)}
                                        style={{ backgroundColor: '#064d7d', padding: 10, borderRadius: 5, marginTop: 10 }}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Download Note {index + 1}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View className="mb-10 p-2">
                                <TouchableOpacity onPress={toggleVideoNotes}>
                                    <ModulesButtons
                                        image={showVideo ? Page : Page2}
                                        header={showVideo ? "Read Notes" : "Watch Video"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                     onPress={handleQuizPress}
                                >
                                    <ModulesButtons image={Page2} header="Take Quiz" />
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