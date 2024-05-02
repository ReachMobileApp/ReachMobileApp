import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/Avatar.png";
import Card from "@/src/components/BadgeCard";

const ProfileScreen = ({ navigation }: any) => {
    const [selectedSection, setSelectedSection] = useState("aboutMe");

    const handleSwitchChange = (value: boolean) => {
        setSelectedSection(value ? "aboutMe" : "badges");
    };

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
                    <Image source={Avatar} className="w-20 h-20 rounded-full" />

                    <Text className="text-white my-2 px-4 text-xl text-center font-bold">
                        Idowu Musa Abiodun
                    </Text>
                    <Text className="text-white text-center font-bold text-sm">
                        Medical Practitioner
                    </Text>
                    <Text className="text-white text-center font-bold text-sm">
                        Active
                    </Text>
                    <View className="flex justify-center items-center">
                        <TouchableOpacity className="text-center border-white border-2 bg-[#064D7D] rounded-2xl px-10 mt-3 py-2  w-3/5">
                            <Text className="text-white text-center  text-[16px]">
                                EDIT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Switch */}
                <View className="flex-row items-center justify-center mt-4">
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
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Name:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                Idowu Musa Abiodun
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Occupation:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                Medical Practitioner
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Gender:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                  Male
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Mobile Number:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                08087889312
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Email:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                IdowuAbiodun@gmail.com
                            </Text>
                        </View>
                        <View className="flex-row  items-center border ">
                            <Text className="text-white w-2/5 text-lg bg-[#064D7D]">Tag:</Text>
                            <Text className="text-[#064D7D] w-3/5 text-lg bg-white text-center">
                                ASADKKA
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
