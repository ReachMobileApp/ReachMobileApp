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
        <ScrollView className="flex-1 bg-white  ">
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
                        header="MODULE 4"
                        subheader="What patient outcomes can I expect beyond avoiding COVID-19 and other similar health challenges?"
                        videoId="_3NNdRV1ff0"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "In this module, we will analyze: The opportunities and choices available for using remote consulting using the  Capability, Opportunity, and Motivation> Behavior. When you introduce remote consulting in your health-care work and to your team, you will meet resistance to this change. Using this framework will help you understand the resistance and how you can help people change what they do."
                        }
                    />
                ) : (
                    <View>
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 4
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                What patient outcomes can I expect beyond
                                avoiding COVID-19 and other similar health
                                challenges?
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                In this module, we will analyze: The
                                opportunities and choices available for using
                                remote consulting using the Capability,
                                Opportunity, and Motivation{">"} Behavior. When
                                you introduce remote consulting in your
                                health-care work and to your team, you will meet
                                resistance to this change. Using this framework
                                will help you understand the resistance and how
                                you can help people change what they do.
                            </Text>
                        </View>
                        <View className="m-4 border">
                            <View className="p-2">
                                <Text className="mb-3 text-[#707070] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="mb-2 text-[#707070] text-base uppercase">
                                        MODULE 4: What patient outcomes can I
                                        expect beyond avoiding COVID-19 and
                                        other similar health challenges?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. LEARNING OUTCOMES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Explain how digital communication with
                                        patients and between health
                                        professionals about clinical issues is
                                        likely to have benefit patient care and
                                        health outcomes
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Describe the potential improvements in
                                        both disease safety, whilst also
                                        maintaining normal health care, arising
                                        from the use of digital communication.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Beyond the improvements in health
                                        outcomes, the learning outcomes also
                                        include describing the benefits of using
                                        digital communication for patients, and
                                        as well as to . . . . .
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Describe the possible impacts on
                                        patients’ skills and confidence to
                                        self-manage existing conditions and both
                                        prevent and manage the spread of
                                        infectious diseases while providing
                                        healthcare.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. PATIENT OUTCOMES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Our UK research, undertaken in normal,
                                        non-pandemic circumstances told us that
                                        remote consulting could support the
                                        individual to manage their own health
                                        better. In the pandemic, however, remote
                                        consulting may also save their lives.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In this module we will consider both
                                        types of patient outcomes as outlined
                                        below:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Firstly we consider what difference
                                        remote consulting made to young adults
                                        living with long-term conditions such as
                                        HIV, sickle cell disease, depression,
                                        and diabetes.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Secondly, we consider how the patient
                                        outcome of safety can be delivered using
                                        remote consulting during the pandemic.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. WHAT POSITIVE OUTCOMES DID UK
                                        PATIENTS EXPERIENCE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        Communicating at the right time for them
                                        (mobile device and asynchronous SMS) was
                                        more helpful for managing their health.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        Patients could ask a question at
                                        whatever time they thought of it and
                                        wherever they were. They (patients) were
                                        also clear that they didn’t expect a
                                        response for 24/36/48hrs.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        Timely digital communication/remote
                                        consulting – that is, being able to ask
                                        a question at the right time for them
                                        made a difference to how they (that is,
                                        patients) managed their health and
                                        enhanced engagement in their health.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Also, patients were able to ask a
                                        question, receive a response in a
                                        reasonable timeframe and enact that
                                        information and take action for their
                                        health.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. WHAT POSITIVE OUTCOMES DID UK
                                        PATIENTS EXPERIENCE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How do I offer appointments to patients?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Means of communication such as SMS/email
                                        meant they could reach the person they
                                        wanted to reach. They could also speak
                                        to a dietician/nurse or whoever they
                                        needed to.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        It is important to note that, Nurse was
                                        sometimes a portal to triage digital
                                        consulting in the clinic and refer
                                        patients to the right person.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Thus access to healthcare providers
                                        improved relationships and trust in
                                        health providers and also improved
                                        face-to-face interaction.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The patient could also revisit any
                                        advice/view prescriptions whenever they
                                        wanted, and
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        People can write when they don’t want to
                                        talk about something.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. READ AND UNDERTAKE THE PATIENT
                                        JOURNEY ACTIVITY – INTERCEPT THE PATIENT
                                        JOURNEY WITH REMOTE CONSULTING.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Now we are moving on to thinking about
                                        patient outcomes within a pandemic
                                        context. Here we are focussing on the
                                        types of patients and conditions that
                                        you would often see in your clinical
                                        practice.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Select two conditions that you are most
                                        familiar with e.g.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        Epilepsy
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        Diabetes
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        Hypertension
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        Chronic Renal disease
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        Sickle Cell disease
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now have a better
                                        understanding of the positive outcomes
                                        related to remote consulting and how you
                                        can integrate remote consulting within
                                        the normal patient journey.
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
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenFour")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
