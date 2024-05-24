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
        <View className="flex-1 bg-white  pt-2">
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
            <View className="bg-white flex-1">
                {showVideo ? (
                   <ScrollView>
                    <Module
                        header="MODULE 2"
                        subheader="How does my role change and the care I provide my patients?"
                        videoId="1FcQ6Vi_QPs"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "In this Module, we will discuss how digital communication changes the nature of the health professional and patient roles, and their interactions. Analyse the change in roles for patients and health professionals involved in digital communication. Describe the doctor-patient digital interaction process and its outcomes in various settings."
                        }
                    />
                     <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenTwo")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
                   </ScrollView>
                ) : (
                    <View className="flex-1">
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 2
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                How does my role change and the care I provide
                                my patients?
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                In this Module, we will discuss how digital
                                communication changes the nature of the health
                                professional and patient roles, and their
                                interactions.
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                Analyse the change in roles for patients and
                                health professionals involved in digital
                                communication. Describe the doctor-patient
                                digital interaction process and its outcomes in
                                various settings.
                            </Text>
                        </View>
                        <ScrollView className="m-4 flex-1">
                            <View className="p-2">
                                <Text className="mb-3 text-[#707070] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        MODULE 2: HOW DOES MY ROLE CHANGE AND
                                        THE CARE I PROVIDE MY PATIENTS?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. HOW DOES MY ROLE CHANGE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You may be wondering how remote
                                        consulting differs from face-to-face
                                        consulting. Here are some of the top
                                        line considerations and we will address
                                        them one by one.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - What infrastructure is needed?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - How can scheduling happen?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - What changes about the actual
                                        consultation with the patient?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Will I ever be off-duty?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. HOW DOES MY ROLE CHANGE?: THE
                                        INFRASTRUCTURE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Now let’s take time to contemplate the
                                        following:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Where do I consult from?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - What device do I use and what devices
                                        will my patients be using?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Do we both have access to digital
                                        and/or telecoms infrastructure?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Who will pay for the airtime/contract?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. WHEN YOU CONSIDER WHERE YOU WILL
                                        DELIVER REMOTE CONSULTING FROM YOU HAVE
                                        TO THINK ABOUT THINGS, THEY YOU DIDN’T
                                        BEFORE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Do you have, and need, privacy?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Are you in a quiet or noisy place
                                        where it may be difficult for you to
                                        hear the patient and the patient to hear
                                        you?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Do you need access to patient records
                                        before you make the call?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - There are also considerations about
                                        where your patient will be when you
                                        call, and will they have privacy and
                                        noise?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Will you be using your own phone or an
                                        office phone? The cost of who pays for
                                        the call can be a complex issue for
                                        health workers. Do you need to begin
                                        discussing this with your employer?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - If you and your patient are using
                                        smartphones it offers opportunities for
                                        them to share a picture of a rash or a
                                        wound with you. If you are using
                                        ordinary phones that cannot take
                                        pictures or connect to the internet you
                                        may be limited to describing the health
                                        problem
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. HOW DOES MY ROLE CHANGE: THE
                                        CONSULTATION
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How do I offer appointments to patients?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        When remote consulting via telephone you
                                        need some way of scheduling appointments
                                        e.g. telling patients by SMS that
                                        they’ll get a call on a specific
                                        date/time.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How do I triage the remote care I
                                        provide?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        This is more difficult over the phone,
                                        and you need to think about asking the
                                        right questions immediately to assess if
                                        a patient is very ill and needs to be
                                        reviewed soon or can have a later
                                        appointment. You might need to work with
                                        the record officer to help you triage
                                        and schedule care.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. HOW DOES MY ROLE CHANGE: THE
                                        CONSULTATION
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        To start answering these questions, we
                                        will look at the Rural Maternity Care
                                        Case Study which will help you start
                                        thinking about how to organise
                                        scheduling of care.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Does remote consulting change the
                                        questions I ask my patients and the
                                        answers they give?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What’s the difference when you can see
                                        somebody to when you can’t see them?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Where will patients go for investigation
                                        or referrals and how do I arrange this?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. RURAL MATERNITY CASE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Develop and write down the organisation
                                        of a new remote pregnancy clinic. Think
                                        about the following questions from the
                                        slide:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - How do I offer appointments to
                                        patients?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - How do I triage the remote care I
                                        provide?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Does remote consulting change the
                                        questions I ask my patients and the
                                        answers they give?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Where will patients go for
                                        investigation or referrals and how do I
                                        arrange this?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - How will you convince your co-workers
                                        that remote consulting is an essential
                                        change to protect lives and the
                                        maternity care health provision?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        7. HOW DOES THE CARE I GIVE TO MY
                                        PATIENTS CHANGE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Delivering good quality of healthcare is
                                        important to all of us. We like to think
                                        we are good communicators, our patients
                                        trust us, we listen carefully to the
                                        details they tell us. We piece together
                                        the evidence we see, hear and read to
                                        make good judgements about what they do,
                                        or might need. When one or more of those
                                        sources of information is not available
                                        to us we ask ourselves how much
                                        difference will it make? How can we
                                        compensate for the missing records or
                                        the missing visual signs?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        8. HOW DOES THE CARE I GIVE TO MY
                                        PATIENTS CHANGE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Please undertake the following activity
                                        – Maintaining Quality of Care Through
                                        Remote Consulting. This activity will
                                        help you think through a remote patient
                                        encounter
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        9. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now be thinking more about
                                        some of the changes to your role and the
                                        consultation process in providing remote
                                        consulting including how to offer and
                                        conduct appointments You should also be
                                        aware of how to address these changes
                                        and ensure you continue to provide high
                                        quality care through remote consulting.
                                    </Text>
                                </View>
                            </View>
                <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenTwo")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
                        </ScrollView>
                    </View>
                )}
                {/* Buttons */}
            </View>
        </View>
    );
};

export default ModuleScreen;
