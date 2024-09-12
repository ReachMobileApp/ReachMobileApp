import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./../../config";
import { LinearGradient } from "expo-linear-gradient";
import Card from "@/src/components/BadgeCard";



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
            <LinearGradient colors={["#064D7D", "#1E88E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} className="flex-row justify-between items-center px-4 pt-10 pb-5 bg-[#064D7D]">
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                {/* Profile image */}
            </LinearGradient>
            <ScrollView style={styles.badgesContainer}>
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
              <Text style={styles.noBadgesText}>No badges earned yet.</Text>
            )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    badgesContainer: {
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        
      },
      noBadgesText: {
        fontSize: 18,
        textAlign: "center",
        color: "#666",
        marginTop: 20,
      },
})

export default BadgesScreen;
