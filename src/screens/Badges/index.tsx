import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./../../config";

import Card from "@/src/components/BadgeCard";
import Avatar from "@/assets/images/image.png";

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

const BadgesScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<Module[]>([]);

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

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
            setLoading(true);
            fetchModules();
        }, [])
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center px-4 pt-6 pb-4 bg-[#064D7D]">
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                {/* Profile image */}
                <Image source={Avatar} className="w-8 h-8 rounded-full" />
            </View>
            <ScrollView className="mt-10 flex-1">
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
            </ScrollView>
        </View>
    );
};

export default BadgesScreen;
