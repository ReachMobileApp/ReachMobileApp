import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, Platform, StyleSheet } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

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

    const downloadFile = async (url: string) => {
        try {
            const filename = 'Introductory_note.pdf';
            const result = await FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + filename
            );

            if (result.status !== 200) {
                throw new Error('Failed to download file');
            }

            if (Platform.OS === 'android') {
                await saveAndroidFile(result.uri, filename);
            } else {
                await shareIOSFile(result.uri, filename);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            Alert.alert("Download error", "There was an error downloading the file.");
        }
    };

    const saveAndroidFile = async (fileUri: string, filename: string) => {
        try {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const destinationUri = await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    filename,
                    'application/pdf'
                );
                await FileSystem.copyAsync({
                    from: fileUri,
                    to: destinationUri,
                });
                Alert.alert("Success", `File downloaded as ${filename}`);
            } else {
                throw new Error('Storage permission not granted');
            }
        } catch (error: any) {
            console.error("Error saving file on Android:", error);
            Alert.alert("Error", `Could not save file: ${error.message}`);
        }
    };

    const shareIOSFile = async (fileUri: string, filename: string) => {
        try {
            await Sharing.shareAsync(fileUri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error: any) {
            console.error("Error sharing file on iOS:", error);
            Alert.alert("Error", `Could not share file: ${error.message}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#064D7D', '#1E88E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SideMenuNavigator", {
                            screen: "MenuScreen",
                        })
                    }
                    style={styles.menuButton}
                >
                    <Ionicons name="menu" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Welcome</Text>
            </LinearGradient>
            {/* Introductory Message */}
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    We are excited to have you on board! Below is an introductory video and some notes to get you started.
                </Text>
            </View>

            {/* Video Player */}
            <View style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    useNativeControls
                    style={styles.video}
                />
            </View>
            {/* Download Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => downloadFile(pdfUrl)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {Platform.OS === 'ios' ? 'Save Introductory Note' : 'Download Introductory Note'}
                    </Text>
                    <Ionicons name="download-outline" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    menuButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 16,
    },
    messageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 24,
    },
    videoContainer: {
        marginTop: 20,
        backgroundColor: '#000000',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 20,
    },
    video: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    buttonContainer: {
        marginTop: 24,
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#064D7D',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 8,
    },
});

export default HomeScreen;