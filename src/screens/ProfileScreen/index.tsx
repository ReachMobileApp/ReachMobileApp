import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image,ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/image.png";

import Card from "@/src/components/BadgeCard";
import { firebaseAuth } from "@/firebaseConfig";
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore'
import Toast from 'react-native-toast-message'

const ProfileScreen = ({ navigation }: any) => {
    const [selectedSection, setSelectedSection] = useState("aboutMe");
    const [userDetails, setUserDetails] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const db = getFirestore();
    const userRef = collection(db, 'users_data');

    const handleSwitchChange = (value: boolean) => {
        setSelectedSection(value ? "aboutMe" : "badges");
    };

    const getCurrentUser = async (): Promise<void> => {
        try {
            firebaseAuth.onAuthStateChanged((user) => {
                const q = query(userRef, where('user_id', '==', user?.uid));
                if (user) {
                    getDocs(q).then(async (snapshot) => {
                        let user_data: any = [];
                        snapshot.docs.map((item) => {
                            user_data.push({ ...item.data(), id: item.id });
                            console.log(user_data);
                            return setUserDetails(user_data);
                        })
                    });
                }
            })
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: error.message
            });
        }
    };


    useEffect(() => {
        getCurrentUser()
        setLoading(false)
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }
    

    return (
        <ScrollView>
            <View className="bg-[#064D7D] h-96">
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

                    <Image source={Avatar} className=" rounded-3xl" />

                    <Text className="text-white my-2 px-4 text-xl text-center font-bold">
                        {userDetails[0]?.username}
                    </Text>
                    <Text className="text-white text-center font-bold text-sm">
                        {/* Medical Practitioner */}
                        {userDetails[0]?.occupation}
                    </Text>
                    <Text className="text-green-500 text-center font-bold text-sm">
                        Active
                    </Text>
                    
                </View>
                {/* Switch */}
                <View className="flex-row items-center justify-center mt-2">
                <View className="flex-row items-center mt-4">
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
            <View className="mt-4">
                {/* Conditional rendering based on selected section */}
                {selectedSection === "aboutMe" ? (
                    <View className="mt-4  gap-4">
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 pl-4 text-lg bg-[#064D7D]">Name:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {/* Idowu Musa Abiodun */}
                                {userDetails[0]?.full_name}
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Occupation:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {/* Medical Practitioner */}
                                {userDetails[0]?.occupation}
                            </Text>
                        </View>
                        
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Email:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails[0]?.email}
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">City:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {userDetails[0]?.city}
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg pl-4 bg-[#064D7D]">Username:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                {/* IdowuAbiodun@gmail.com */}
                                {userDetails[0]?.username}
                            </Text>
                        </View>
                        
                        
                     
                    </View>
                ) : (
                    <View className="mt-4">
                        <Card header="MODULE 1" subheader="What digital devices, services and apps can be used for remote consulting?" duration="1 hr" />
                        <Card header="MODULE 1" subheader="What digital devices, services and apps can be used for remote consulting?" duration="1 hr" />
                        {/* Render badges section */}
                        {/* Add your badges UI here */}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;
