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

// Initialize Firestore
const db = getFirestore();
const auth = getAuth();

const updateModuleStatus = async (
    userId: string,
    moduleId: string,
    status: string
) => {
    try {
        const docRef = doc(db, "users_data", userId, "modules", moduleId);
        await setDoc(docRef, { status }, { merge: true });
        console.log("Module status updated successfully");
    } catch (error) {
        console.error("Error updating module status:");
    }
};

const fetchModuleStatuses = async (userId: string) => {
    const colRef = collection(db, "users_data", userId, "modules");
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    const statuses: { [key: string]: string } = {}; // Add index signature

    querySnapshot.forEach((doc) => {
        statuses[doc.id] = doc.data().status || "Not Started";
    });

    return statuses;
};

const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useFocusEffect(
        useCallback(() => {
            const fetchStatuses = async () => {
                if (user) {
                    const moduleStatuses = await fetchModuleStatuses(user.uid);
                    setStatuses(moduleStatuses);
                    setLoading(false);
                }
            };
            fetchStatuses();
        }, [user])
    );

    if (!user) {
        navigation.navigate("LoginScreen");
        return null;
    }

    const handleModulePress = (moduleId: string, screenName: string) => {
        if (user) {
            updateModuleStatus(user.uid, moduleId, "In progress");
            navigation.navigate("ModulesNavigator", { screen: screenName });
        }
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
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module1", "ModuleOne")
                        }>
                        <Card
                            header="Module 1"
                            subheader="What digital devices, services, and apps can be used for remote consulting?"
                            duration="1 hr"
                            status={statuses["module1"] || "Not Started"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module2", "ModuleTwo")
                        }>
                        <Card
                            header="Module 2"
                            subheader="How does my role change and the care I provide my patients?"
                            duration="9 mins"
                            status={statuses["module2"] || "Not Started"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module3", "ModuleThree")
                        }>
                        <Card
                            header="Module 3"
                            subheader="Remote Consulting for Healthcare: ReaCH Training CourseBook"
                            duration="1 hr"
                            status={statuses["module3"] || "Not Started"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module4", "ModuleFour")
                        }>
                        <Card
                            header="Module 4"
                            subheader="What patient outcomes can I expect beyond avoiding COVID-19 and other similar health challenges?"
                            duration="1 hr"
                            status={statuses["module4"] || "Not Started"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module5", "ModuleFive")
                        }>
                        <Card
                            header="Module 5"
                            subheader="What is my plan for delivering my healthcare work remotely?"
                            duration="1 hr"
                            status={statuses["module5"] || "Not Started"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module6", "ModuleSix")
                        }>
                        <Card
                            header="Module 6"
                            subheader="What behaviors will help or hinder a successful transition to remote consulting?"
                            duration="1 hr"
                            status={statuses["module6"] || "Not Started"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleModulePress("module7", "ModuleSeven")
                        }>
                        <Card
                            header="Module 7"
                            subheader="What qualities do you have and need to deliver remote healthcare and support your colleagues/teams?"
                            duration="1 hr"
                            status={statuses["module7"] || "Not Started"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
