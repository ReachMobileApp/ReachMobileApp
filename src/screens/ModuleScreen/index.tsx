import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./../../config";
import { decode } from "html-entities";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';


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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }



    return (
        <View style={styles.container}>
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
                <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
                Welcome to this training course!
            </Text>
        </LinearGradient>
               
               <ScrollView style={styles.moduleList}>
               {modules.map((module) => (
                   <TouchableOpacity
                       key={module.id}
                       onPress={() => handleModulePress(module)}
                       style={[
                           styles.moduleCard,
                           !module.has_user && styles.lockedModule
                       ]}
                   >
                       <View style={styles.moduleIconContainer}>
                           <Ionicons
                               name={module.has_user ? "play-circle" : "lock-closed"}
                               size={40}
                               color={module.has_user ? "#064d7d" : "gray"}
                           />
                       </View>
                       <View style={styles.moduleContent}>
                           <Text style={styles.moduleName}>
                               {module.name}
                           </Text>
                           {module.has_completed_quiz && (
                               <Ionicons
                                   name="checkmark-circle"
                                   size={20}
                                   color="green"
                                   style={styles.completedIcon}
                               />
                           )}
                       </View>
                   </TouchableOpacity>
               ))}
           </ScrollView>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    menuButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
    },
    moduleList: {
        padding: 16,
    },
    moduleCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lockedModule: {
        opacity: 0.5,
    },
    moduleIconContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    moduleContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moduleName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    completedIcon: {
        marginLeft: 8,
    },
});

export default ModuleScreen;