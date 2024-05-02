import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Module from "@/src/components/Module";
import ModulesButtons from "@/src/components/ModulesButtons";
import Page from "@/assets/images/menuIcons/Page-1.png";
import Page2 from "@/assets/images/menuIcons/Page-2.png";

type ModuleScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};

const ModuleScreen = ({ navigation }: ModuleScreenProps) => {
    return (
        <ScrollView className="flex-1 bg-white  pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("SideMenuNavigator", {
                                screen: "MenuScreen",
                            })
                        }
                        className="p-2">
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    {/* Notification icon */}
                    <TouchableOpacity
                        onPress={() => {
                            /* Add navigation logic for notifications */
                        }}
                        className="p-2">
                        <Ionicons
                            name="alarm-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main content */}
            <View className="bg-white ">
                <View>
                    <Module
                        header="INTRODUCTION"
                        subheader="Introduction to Remote Consulting - Full lecture"
                        videoId="IS1U3OtNMVc"
                        duration="1 hr"
                        learningOutcome={
                            "Welcome to this training course on how to deliver healthcare remotely to your patients and communities and why it is important during the COVID-19 pandemic. This training program has been developed following research and teaching collaborations between St Francis University College of Health and Allied Sciences (Tanzania), the University of Warwick & King’s College London (UK), and the University of Ibadan’(Nigeria)"
                        }
                    />
                    {/* Add content specific to Module 1 */}
                </View>
               {/* <View className="mb-10">
               <TouchableOpacity>
                    <ModulesButtons image={Page} header="Read Notes" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ModulesButtons image={Page2} header="Take Quiz" />
                </TouchableOpacity>
               </View> */}
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
