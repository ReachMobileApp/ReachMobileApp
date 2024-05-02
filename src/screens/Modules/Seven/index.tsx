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
                        header="MODULE 7"
                        subheader="What qualities do you have and need to deliver remote healthcare and support your colleagues/teams?"
                        videoId="Nc8rLTwo_cE"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "This is the last module in the series that we have been studying. By now, you should be comfortable enough to conduct remote consulting in health. This last Module is to wrap up what you have learnt so far, and I want to congratulate you for staying through.We will reflect on the leadership qualities required to bring about change."
                        }
                    />
                ) : (
                    <View>
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 7
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                What qualities do you have and need to deliver
                                remote healthcare and support your
                                colleagues/teams?
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                This is the last module in the series that we
                                have been studying. By now, you should be
                                comfortable enough to conduct remote consulting
                                in health. This last Module is to wrap up what
                                you have learnt so far, and I want to
                                congratulate you for staying through. We will
                                reflect on the leadership qualities required to
                                bring about change.
                            </Text>
                        </View>
                        <View className="m-4 border">
                            <View className="p-2">
                                <Text className="mb-3 text-[#707070] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="mb-2 text-[#707070] text-base uppercase">
                                        MODULE 7: WHAT QUALITIES DO YOU HAVE AND
                                        NEED TO DELIVER REMOTE HEALTHCARE AND
                                        SUPPORT YOUR COLLEAGUES/TEAMS?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. WHAT QUALITIES DO YOU HAVE AND NEED
                                        TO DELIVER REMOTE HEALTHCARE AND SUPPORT
                                        YOUR COLLEAGUES/TEAMS?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Leadership matters a lot in the
                                        attainment of goals, without competent
                                        leadership, it would be difficult to
                                        achieve set goals including
                                        patient-centered care as we treat in
                                        this Module
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. CLINICAL LEADERSHIP COMPETENCY
                                        FRAMEWORK
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        Clinical leadership
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        As we mentioned earlier, leadership
                                        matters a lot in the achievement of
                                        objectives, be it in the health system
                                        or in any life endeavor”
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        All health workers undertake the role of
                                        leadership in their own areas of work.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Clinical Leadership Competency Framework
                                        (CLCF)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        CLCF describes the leadership
                                        competencies that health workers need to
                                        become more actively involved in the
                                        planning, delivery, and transformation
                                        of health care services – this can be
                                        their day-to-day delivery of health care
                                        or considering their wider
                                        team/facility/service”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        CLCF consists of five domains”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. FIVE CORE LEADERSHIP DOMAINS
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We will at this stage consider
                                        leadership under five core domains as
                                        follows . . . . .
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        These Five Core Leadership Domains are:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Demonstrating Personal Qualities
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Working with Others
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Managing Services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Improving Services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        5. Setting Direction
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. CLINICAL LEADERSHIP COMPETENCY
                                        FRAMEWORK … 1
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Demonstrating Personal Qualities
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Developing self-awareness: seek feedback
                                        from others on your strengths and
                                        limitation.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        Managing yourself: remain calm and
                                        focused under pressure.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Continuing personal development:
                                        actively seek opportunities to learn
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Acting with integrity: speak out when
                                        you see that ethics or values are being
                                        compromised.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Working with Others
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        Developing networks: seek collaborations
                                        with others”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Building and maintaining relationships:
                                        take into account the needs and feelings
                                        of others”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Encouraging contribution: actively seek
                                        contributions and views from others”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Working within teams: appreciate the
                                        efforts of others within the team &
                                        respect the team’s decision
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Managing Services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Planning: make use of feedback from
                                        patients, service users, and colleagues
                                        when developing plans
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Managing resources: the need to take
                                        action when resources are not being used
                                        efficiently and effectively
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Managing people: it is essential to
                                        support team members & provide them with
                                        clear direction
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Managing performance: you must take
                                        actions to improve performance”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Improving Services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ensuring patient safety: take action
                                        when you notice shortfalls in patient
                                        safety
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Critically evaluating: use feedback from
                                        patients, carers, and service users to
                                        evaluate your services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Encouraging improvement and innovation:
                                        in order to enhance performance, put
                                        forward ideas to improve the quality of
                                        services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Facilitating transformation: It is
                                        well-deserving to motivate others to
                                        ensure change happens
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. Setting Direction
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Identifying the contexts for change
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Identify the drivers of change (e.g.
                                        political, social, technical,
                                        economical, organisational,
                                        professional)”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Applying knowledge and evidence
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        It is appropriate to use data and
                                        information to suggest improvements to
                                        services”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Making decisions
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        it is important to consult with key
                                        people and groups when making decisions,
                                        this way, you will improve service
                                        delivery better and also make mistakes
                                        less”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Evaluating impact
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        It is of utmost importance that you
                                        evaluate the impact of changes on
                                        patients and service delivery.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. THE CLCF SELF-ASSESSMENT TOOL
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        1. Self-assessment is a vital exercise
                                        for one's personal evaluation of
                                        abilities/capacities regarding the
                                        readiness to undertake the desirable
                                        assignments. Here in this Module, a
                                        self-assessment tool has been designed
                                        for individuals to ‘gauge’ their levels
                                        of competencies.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The self-assessment tool can:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Allow you to reflect on which areas of
                                        the leadership framework you would like
                                        to improve.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Help you recognize your own strengths
                                        and weaknesses.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2 ">
                                        2. Take time to complete the CLCF
                                        self-assessment tool and write some
                                        notes about this process guided by these
                                        questions:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        a) What did you learn about leadership?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        b) What did you learn about yourself as
                                        a leader that you are happy to share
                                        with the other learners?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now have a better
                                        understanding of the Clinical Leadership
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Competency Framework, your own
                                        strengths, and weaknesses through
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        completion of the self-assessment tool
                                        and an understanding of the qualities
                                        needed to implement remote consulting
                                        and support your teams.{" "}
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
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenSeven")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
