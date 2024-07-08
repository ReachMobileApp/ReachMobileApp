import React, { useState, useCallback, useEffect } from "react";
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Card from "@/src/components/ModuleCard";

const fetchCourses = async (token) => {
    try {
        const response = await axios.get('https://reachweb.brief.i.ng/api/v1/courses', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Courses:', response.data.data.data.data);
        AsyncStorage.setItem('courseId', JSON.stringify(response.data.data.data.data));
        return response.data.data.data.data;

    } catch (error) {
        console.error("Error fetching courses:", error);
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Failed to fetch courses'
        });
        return [];
    }
};

const fetchCourseById = async (token, courseId) => {
    try {
        const response = await axios.get(`https://reachweb.brief.i.ng/api/v1/courses/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Course:', response);
        return response.data.course;
    } catch (error) {
        console.error("Error fetching course:", error);
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Failed to fetch course'
        });
        return null;
    }
};

const fetchCourseModules = async (token) => {
    try {
        const response = await axios.get(`https://reachweb.brief.i.ng/api/v1/courses/01j1yen0dmjgmc29f6vav8h1bj/modules`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Modules:', response.data.modules);
        return response.data.modules;
    } catch (error) {
        console.error("Error fetching course modules:", error);
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Failed to fetch course modules'
        });
        return [];
    }
};

const ModuleScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [courseId, setCourseId] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    const courses = await fetchCourses(storedToken);
                    if (courses.length > 0) {
                        const selectedCourseId = courses[0].id; // Assuming there's only one course
                        setCourseId(selectedCourseId);
                        const course = await fetchCourseById(storedToken, selectedCourseId);
                        if (course) {
                            const courseModules = await fetchCourseModules(storedToken, selectedCourseId);
                            setModules(courseModules);
                        }
                    } else {
                        Toast.show({
                            type: 'info',
                            text1: 'No Courses',
                            text2: 'No courses found'
                        });
                    }
                } else {
                    navigation.navigate("AuthNavigator", { screen: "LoginScreen" });
                }
                setLoading(false);
            };
            fetchData();
        }, [navigation])
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    // const handleModulePress = (moduleId: string, screenName: string) => {
    //     if (token) {
    //         updateModuleStatus(token, moduleId, "In progress");
    //         navigation.navigate("ModulesNavigator", { screen: screenName });
    //     }
    // };

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
                    {modules.map((module) => (
                        <TouchableOpacity
                            key={module.id}
                            // onPress={() => handleModulePress(module.id, module.screenName)}
                        >
                            <Card
                                header={module.title}
                                subheader={module.description}
                                duration={module.duration}
                                status={module.status || "Not Started"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
