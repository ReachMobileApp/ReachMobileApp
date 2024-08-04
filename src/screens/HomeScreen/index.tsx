import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const videoRef = useRef<Video>(null);

    const videoUrl = "https://uhfiles.ui.edu.ng/build/assets/introductoryvideo-D_vKyPY2.mp4";
    const pdfUrl = "https://uhfiles.ui.edu.ng/build/assets/Introductory%20module-HEzWMrdI.pdf";

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (videoRef.current) {
                    videoRef.current.pauseAsync();
                }
            };
        }, [])
    );

    const requestFileWritePermission = async () => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
            Alert.alert("Permission Denied", "File write permission is required to download files.");
            return { access: false, directoryUri: null };
        }
        return { access: true, directoryUri: permissions.directoryUri };
    };

    const downloadFile = async (url: string) => {
        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'temp.pdf');
            if (response.status !== 200) {
                throw new Error('Failed to download file');
            }
            const base64Data = await FileSystem.readAsStringAsync(response.uri, { encoding: FileSystem.EncodingType.Base64 });
            const hasPermissions = await requestFileWritePermission();
            if (hasPermissions.access) {
                await saveReportFile(base64Data, hasPermissions.directoryUri || "");
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            Alert.alert("Download error", "There was an error downloading the file.");
        }
    };

    const saveReportFile = async (base64Data: string, directoryUri: string) => {
        try {
            const fileName = `Introductory_note.pdf`;
            const fileUri = await StorageAccessFramework.createFileAsync(directoryUri, fileName, 'application/pdf');

            await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

            Alert.alert("Success", `File downloaded as ${fileName}`);
        } catch (error: any) {
            console.error("Error saving file:", error);
            Alert.alert("Error", `Could not save file: ${error.message}`);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 bg-[#064D7D]">
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SideMenuNavigator", {
                            screen: "MenuScreen",
                        })
                    }
                    className="p-2"
                >
                    <Ionicons name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Introductory Message */}
            <View className="px-4 mt-6">
                <Text className="text-lg text-gray-700">
                    We are excited to have you on board! Below is an introductory video and some notes to get you started.
                </Text>
            </View>

            {/* Video Player */}
            <View className="flex-1 justify-center items-center mt-6">
                <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    useNativeControls
                    className="w-full h-64"
                />
            </View>

            {/* Download Button */}
            <View className="px-4 mt-6">
                <TouchableOpacity
                    onPress={() => downloadFile(pdfUrl)}
                    className="bg-[#064D7D] py-2 px-4 rounded-lg items-center"
                >
                    <Text className="text-white text-lg">Download Introductory Note</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
