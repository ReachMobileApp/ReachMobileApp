import React, { useState } from "react";
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
    const [showVideo, setShowVideo] = useState(true);

    const toggleVideoNotes = () => {
        setShowVideo((prev) => !prev);
    };

    return (
        <ScrollView className="flex-1 bg-white  pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
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
                {showVideo ? (
                    <Module
                        header="MODULE 1"
                        subheader="What digital devices, services, and apps can be used for remote consulting?"
                        videoId="yQYGSYppNkw"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "Analyze different forms of digital communication in common use. Consider how they might be used in health care."
                        }
                    />
                ) : (
                    <View>
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 1
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                What digital devices, services, and apps can be
                                used for remote consulting?
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                Analyze different forms of digital communication
                                in common use. Consider how they might be used
                                in health care.
                            </Text>
                        </View>
                        <View className="m-4 border">
                            <View className="p-2">
                                <Text className="mb-3 text-[#183745] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        MODULE 1 WHAT DIGITAL DEVICES, SERVICES
                                        AND APPS CAN BE USED FOR REMOTE
                                        CONSULTING?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. WHAT DIGITAL DEVICES, SERVICES AND
                                        APPS CAN BE USED FOR REMOTE CONSULTING?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Different devices, services, and apps
                                        have different characteristics. When
                                        thinking about…
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Timing of interaction, it may be:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Synchronous – ‘that is ….
                                        communicating with each other at the
                                        same time for example making a phone
                                        call’.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Asynchronous – ‘when….there is a gap
                                        between the communication for example
                                        using email or text messages.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Form of communication:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Audio (using a mobile phone),
                                        audio-visual (video conferencing), text,
                                        photos/videos.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Specificity of the platform:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Generic – you can use platforms that
                                        are not specific to health to talk to
                                        colleagues/patients e.g. Whatsapp.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Provider-specific – using a platform
                                        or app that is specific for health.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        1.1. HARDWARE FOR DIGITAL ACCESS:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Phone/tablet/computer In terms of ….
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        ‘’Ownership of hardware: this may be
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Owned/borrowed/shared/communal Also,
                                        the device may be…’Provided by an
                                        intermediary e.g. a community health
                                        worker or Provided by a health provider
                                        or other service
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. USING YOUR OWN MOBILE PHONE FOR
                                        REMOTE CONSULTING
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In this course, we will focus mostly on
                                        how health workers can use their own
                                        mobile phones to be in touch with
                                        patients for remote consulting”. There
                                        are several things you should consider
                                        based on your situation. These includes
                                        . . . .
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Using your own mobile phone and
                                        protecting your privacy:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - Have a central phone number for
                                        patients to phone who are seeking health
                                        care. ……. Use a phone with two sim cards
                                        and reserve one card for personal use.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        - If you reveal your phone number to
                                        patients you need to make it clear to
                                        them when they can use it (and when they
                                        should not)”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. OTHER THINGS TO THINK ABOUT
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        When thinking about remote consulting,
                                        in addition to the technology we need to
                                        think about:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What component of healthcare is it
                                        replacing? What will the experience be
                                        like for the patient? What are the costs
                                        – for the health worker, patient, and
                                        wider health system? Which health
                                        workers are using it? How does its use
                                        fit with the wider health system?” We
                                        will be considering these issues further
                                        during the course
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {/* Buttons */}
                <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenOne")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
