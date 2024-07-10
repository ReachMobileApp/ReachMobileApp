import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/image.png";
import Play from "@/assets/images/play.jpg";
import axios from "axios";

import Card from "@/src/components/BadgeCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

// interface ApiResponse {
//     data: {
//         data: Module[];
//     };
// }

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


const ProfileScreen = ({ navigation }: any) => {
    const [selectedSection, setSelectedSection] = useState("aboutMe");
    const [userDetails, setUserDetails] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    // const [modules, setModules] = useState<Module[]>([]);
    const [completedModules, setCompletedModules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const extractFirstParagraph = (html: string): string => {
        const match = html.match(/<p>(.*?)<\/p>/);
        return match ? match[1] : ''; // Return the content of the first <p> tag, or an empty string if not found
    };

    const fetchProfile = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;
                

                const response = await axios.get<ApiResponse2>(
                    `https://reachweb.brief.i.ng/api/v1/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(response.data.data[0].profile);
                setUserDetails(response.data.data[0].profile)
                
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchModules = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;
                setUserDetail(parsedUserInfo.data.user)

                const response = await axios.get<ApiResponse2>(
                    `https://reachweb.brief.i.ng/api/v1/courses/01j1bdmvf8wk0asczzbgx1c6yy/modules`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // setModules(response.data.data.data[0].modules);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
        fetchProfile();
    }, []);

    const handleSwitchChange = (value: boolean) => {
        setSelectedSection(value ? "aboutMe" : "badges");
    };

    // const getCurrentUser = async (): Promise<void> => {
    //     try {
    //         firebaseAuth.onAuthStateChanged(async (user) => {
    //             if (user) {
    //                 const userQuery = query(userRef, where('user_id', '==', user.uid));
    //                 const snapshot = await getDocs(userQuery);

    //                 const userData: any = [];
    //                 snapshot.docs.forEach((item) => {
    //                     userData.push({ ...item.data(), id: item.id });
    //                 });
    //                 setUserDetails(userData);

    //                 const modulesRef = collection(db, 'users_data', user.uid, 'modules');
    //                 const modulesSnapshot = await getDocs(modulesRef);

    //                 const moduleIdToNumber :{ [key: string]: number } = {
    //                     'module1': 1,
    //                     'module2': 2,
    //                     'module3': 3,
    //                     'module4': 4,
    //                     'module5': 5,
    //                     'module6': 6,
    //                     'module7': 7,
    //                     // Add more modules as needed
    //                 };

    //                 const completedModulesData: any = [];
    //                 modulesSnapshot.docs.forEach((moduleDoc) => {
    //                     const moduleData = moduleDoc.data();
    //                     const moduleNumber = moduleIdToNumber[moduleDoc.id];
    //                     if (moduleData.status === "completed" && moduleNumber) {
    //                         completedModulesData.push({ ...moduleData, id: moduleDoc.id, moduleNumber });
    //                     }
    //                 });
    //                 setCompletedModules(completedModulesData);
    //             }
    //         });
    //     } catch (error: any) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Error!',
    //             text2: error.message,
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useFocusEffect(
    //     useCallback(() => {
    //         setLoading(true);
    //         getCurrentUser();
    //     }, [])
    // );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    return (
        <View className="flex-1">
            <View className="bg-[#064D7D] h-3/5">
                {/* Header */}
                <View className="flex-row justify-between items-center px-4 pt-6">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="flex items-center mt-10">
                    {/* Profile image */}
                    <Image source={Avatar} className="rounded-3xl" />

                    <Text className="text-white my-2 px-4 text-xl text-center font-bold">
                        {userDetails?.username}
                    </Text>
                    <Text className="text-white text-center font-bold text-sm">
                        {userDetail?.email}
                    </Text>
                    <Text className="text-green-500 text-center font-bold text-sm">
                        Active
                    </Text>
                </View>
                {/* Switch */}
                <View className="flex-row items-center justify-center mt-2">
                    <View className="flex-row items-center mt-6">
                        <TouchableOpacity
                            style={{
                                backgroundColor:
                                    selectedSection === "aboutMe" ? "#81b0ff" : "#ffffff",
                                padding: 10,
                                borderRadius: 20,
                                marginRight: 5,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => handleSwitchChange(true)}
                        >
                            <Text
                                style={{
                                    color: selectedSection === "aboutMe" ? "#ffffff" : "#3e3e3e",
                                    fontWeight: "bold",
                                }}
                            >
                                About Me
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor:
                                    selectedSection === "badges" ? "#81b0ff" : "#ffffff",
                                padding: 10,
                                borderRadius: 20,
                                marginLeft: 5,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => handleSwitchChange(false)}
                        >
                            <Text
                                style={{
                                    color: selectedSection === "badges" ? "#ffffff" : "#3e3e3e",
                                    fontWeight: "bold",
                                }}
                            >
                                Badges
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView className="mt-10 flex-1">
                {/* Conditional rendering based on selected section */}
                {selectedSection === "aboutMe" ? (
                    <View className="mt-4 gap-4">
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 pl-4 text-lg bg-[#064D7D]">Name:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetail?.name}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Occupation:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.occupation}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Email:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetail?.email}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">City:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.city}
                            </Text>
                        </View>
                        <View className="flex-row items-center border">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Username:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails?.username}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View className="mt-4">
                        {completedModules.length > 0 ? (
                            completedModules.map((module) => (
                                <Card
                                    key={module.id}
                                    header={`MODULE ${module.moduleNumber}`}
                                    subheader={module.status}
                                    score={module.score}
                                />
                            ))
                        ) : (
                            <Text className="text-center text-lg">No badges earned yet.</Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
