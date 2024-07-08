
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/src/components/ModuleCard";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video, ResizeMode } from 'expo-av';
// Initialize Firestore
const db = getFirestore();
const auth = getAuth();


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
    return html.replace(/<[^>]*>/g, '');
};
const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;
    const [modules, setModules] = useState<Module[]>([]);

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                const response = await axios.get<ApiResponse>(
                    `https://reachweb.brief.i.ng/api/v1/courses/01j1bdmvf8wk0asczzbgx1c6yy/modules`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

               // console.log(response.data.data.data[0].modules);
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
                    <TouchableOpacity className="p-2">
                        <Ionicons
                            name="alarm-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <Text className="text-white mt-8 mb-4 px-4 text-xl font-bold">
                    Welcome to this training course!
                </Text>
            </View>
            <View className="bg-white">
                <View className="mt-2">
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ModulesNavigator", {
                                screen: "Introduction",
                            })
                        }>
                        <Card
                            header="Introduction"
                            subheader="Introduction to Remote Consulting - Full lecture"
                            duration="30 mins"
                        />
                    </TouchableOpacity>
                    {modules.map((module) => (
                        <View key={module.id} className="mb-4 mt-4 w-full bg-white border-b-2 mx-1 px-1 py-3 flex flex-row ">
                            <Video
                                source={{ uri: module.video }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                className="h-20 w-28"
                                // shouldPlay
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                            //  style={{ width: Dimensions.get('window').width, height: 200 }}
                            />
                            <View className="flex w-8/12  px-3">
                                <Text className="text-xl text-black  font-bold ">{module.name}</Text>
                                <Text className="text-sm text-gray-600">{stripHtmlTags(module.content)}</Text>
                            </View>
                        </View>
                    ))}

                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
