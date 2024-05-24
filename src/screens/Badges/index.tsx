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
import {
    getFirestore,
    query,
    where,
    getDocs,
    collection,
} from "firebase/firestore";
import { firebaseAuth } from "@/firebaseConfig";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import Card from "@/src/components/BadgeCard";
import Avatar from "@/assets/images/image.png";

const BadgesScreen = ({ navigation }: any) => {
    const [completedModules, setCompletedModules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const db = getFirestore();

    const getCurrentUserModules = async (): Promise<void> => {
        try {
            firebaseAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    const modulesRef = collection(
                        db,
                        "users_data",
                        user.uid,
                        "modules"
                    );
                    const modulesSnapshot = await getDocs(modulesRef);

                    const moduleIdToNumber: { [key: string]: number } = {
                        module1: 1,
                        module2: 2,
                        module3: 3,
                        module4: 4,
                        module5: 5,
                        module6: 6,
                        module7: 7,
                        // Add more modules as needed
                    };

                    const completedModulesData: any = [];
                    modulesSnapshot.docs.forEach((moduleDoc) => {
                        const moduleData = moduleDoc.data();
                        const moduleNumber = moduleIdToNumber[moduleDoc.id];
                        if (moduleData.status === "completed" && moduleNumber) {
                            completedModulesData.push({
                                ...moduleData,
                                id: moduleDoc.id,
                                moduleNumber,
                            });
                        }
                    });
                    setCompletedModules(completedModulesData);
                }
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getCurrentUserModules();
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
                {completedModules.length > 0 ? (
                    completedModules.map((module) => (
                        <Card
                            key={module.id}
                            header={`MODULE ${module.moduleNumber}`}
                            subheader={module.status}
                            duration="1 hr"
                            score={module.score}
                        />
                    ))
                ) : (
                    <View className=" flex justify-center items-center flex-1">
                        <Text className="text-center text-lg">
                            No badges earned yet.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default BadgesScreen;
