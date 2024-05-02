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
                        header="MODULE 6"
                        subheader="What behaviors will help or hinder a successful transition to remote consulting?"
                        videoId="Mj9dTRbPfhw"
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
                                MODULE 6
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                What behaviors will help or hinder a successful
                                transition to remote consulting?
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
                                        MODULE 6: WHAT BEHAVIORS WILL HELP OR
                                        HINDER A SUCCESSFUL TRANSITION TO REMOTE
                                        CONSULTING?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. LEARNING OUTCOMES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In this module, we will analyze the
                                        opportunities and choices available for
                                        using remote consulting using the
                                        Capability, Opportunity, and Motivation
                                        {">"} Behaviour (COM: B Framework)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        When you introduce remote consulting in
                                        your healthcare workers and to your team
                                        you will meet resistance to this change.
                                        Using this framework will help you
                                        understand the resistance and how you
                                        can help people change what they do.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. CAPABILITY, OPPORTUNITY AND
                                        MOTIVATION &gt; BEHAVIOUR (COM:B)
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. MINDSCAPE
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. WHAT POSITIVE OUTCOMES DID UK
                                        PATIENTS EXPERIENCE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Messenger: we are heavily influenced by
                                        who communicates information to us.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Incentives: our responses are shaped by
                                        predictable mental shortcuts, such as
                                        the strong desire to avoid losses and
                                        gain rewards.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Norms: We are strongly influenced by
                                        what others do.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Defaults: we go with the flow of pre-set
                                        options.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Salience: our attention is drawn to what
                                        is novel.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Priming: we are influenced by
                                        subconscious cues.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Affect: our actions are shaped by our
                                        emotions.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Commitments: we seek to be consistent
                                        with our public promises.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ego: we behave in ways that make us feel
                                        better about ourselves.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Keep in mind that not all of these
                                        constructs will apply to every
                                        behaviour, but the COM-B model enables
                                        you to explore all of these sorts of
                                        issues as you try to better understand
                                        the context around a behaviour and go on
                                        to design a behaviour change
                                        intervention
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. CONTEXT OF THE MODEL
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The COM-B model sits within the broader
                                        ‘Behaviour Change Wheel’ developed by
                                        Michie et al.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The purpose of the behaviour change
                                        wheel is to assist intervention
                                        designers in the iterative process of
                                        developing behaviour change intervention
                                        that is embedded in theory and relevant
                                        policy.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        The Behaviour Change Wheel is a result
                                        of a synthesis of 19 frameworks of
                                        behaviour, each with their own
                                        limitations, one being the lack of
                                        coherence and clear relation to
                                        behaviour change. .{" "}
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        With lots of competing frameworks
                                        arguing for different theoretical bases
                                        of behaviour change, the behaviour
                                        change wheel was an attempt to bring
                                        some clarity and coherence to this often
                                        confusing literature, and the
                                        complicated process of changing
                                        behaviour.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        The hub of the wheel identifies the
                                        sources of behaviour that an
                                        intervention could successfully target
                                        and does this using the COM-B model.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        Surrounding this is a layer of nine
                                        intervention functions to choose from,
                                        depending on which element or elements
                                        of COM-B that you are trying to address.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        The rim of the wheel identifies seven
                                        types of policy that you can use to help
                                        to achieve the goal of the intervention.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. THEORETICAL DOMAINS FRAMEWORK
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The domains which are listed on the left
                                        of the slide help with increasing the
                                        understanding of the behavior.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        After looking through the COM B
                                        Material, …think about a condition
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Identify a Target behaviour:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What will be the likely impact …..if the
                                        behaviour was changed
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How easy it is to change the behaviour
                                        Scale 1 (very difficult) to 5 very easy)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What will be the impact on other
                                        behaviours?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Lastly……., How will you be able to
                                        measure the behaviour you want to
                                        change?
                                    </Text>
                                   
                                    <Text className="mb-2 text-[#707070] text-base">
                                        7. CONTEXT
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The way that healthcare workers behave
                                        during consultations with patients,
                                        whether face-to-face or via your mobile
                                        phone, is a really important aspect of
                                        the quality of healthcare deliver to
                                        patients worldwide. According to the
                                        World Health Organization definition,
                                        healthcare quality is the extent to
                                        which healthcare services provided to
                                        individuals and patient populations
                                        improved desired health outcomes.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In order to achieve this, healthcare
                                        must be:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Safe - so minimizing risk in harm's
                                        patience.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Effective - referring to healthcare
                                        based on scientific knowledge and
                                        evidence-based guidelines.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Timely - so as to reduce delays in both
                                        providing and receiving healthcare.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Efficient - so uses whatever resources
                                        are available maximally whilst
                                        minimizing waste.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Equitable - so healthcare provision is
                                        the same for everyone irrespective of
                                        protection and other characteristics
                                        such as age, gender, ethnicity, sexual
                                        orientation, and religious beliefs
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        People-centered for keeping the
                                        individual's preferences in mind
                                        throughout.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        8. EXAMPLE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Achieving high-quality healthcare is a
                                        key global goal that many countries
                                        around the world are working towards and
                                        is central to efforts to achieve
                                        universal health coverage (Doodle)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        UHC describes equitable access to all
                                        essential and high-quality health
                                        services that a patient could need
                                        throughout their lifetime without
                                        causing financial hardship (Doodle).
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Now let's consider some examples. A
                                        behavioral problem may be…..
                                        (prescribing medication)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        During remote consultations, prescribing
                                        medication without a full assessment of
                                        the patient and the cause of symptoms’
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We will consider the use of mobile
                                        phones for remote consulting. In moving
                                        over to remote consulting there are many
                                        challenges that health workers face. One
                                        of them is to maintain a high standard
                                        of prescribing – for example ensuring
                                        the patient is assessed fully before a
                                        prescription is issued. It can be
                                        challenging to assess patients by phone,
                                        especially when we first start, with the
                                        danger that we prescribe a medication
                                        that will alleviate symptoms without
                                        being sure of the cause of the problem.
                                        This can lead to less effective and
                                        unsafe practices.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The next step is to choose a Target
                                        behavior, for example ensuring the
                                        patient is assessed fully before issuing
                                        a prescription.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In selecting a target behavior, you
                                        might also want to consider the likely
                                        impact if the behavior was changed
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ease ‘how easy it is to change the
                                        behavior and what will be the impact on
                                        other behaviors
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        will you be able to measure the behavior
                                        you want to change?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Next, think about the specifics of the
                                        behavior. For instance…..
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Who ‘…..will perform the behavior?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What …….will they do?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        When and where will they do it?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How often will they do it?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Who will they do it with?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        ….In our example, it would be the
                                        healthcare worker who performs the
                                        behavior
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We might provide a guide they can have
                                        on their mobile phone or as a paper copy
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        - on how to arrange an examination
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        - diagnostic tests
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        - follow up for patients consulting
                                        remotely.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        They will check the guide when
                                        undertaking remote consulting using
                                        their mobile phone.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Keep in mind that …….’You’ are likely to
                                        consult the guide several times a day
                                        when first undertaking remote
                                        consulting.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        9. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now be thinking more about
                                        behaviors that will help or hinder a
                                        successful transition to remote
                                        consulting. You should also be aware of
                                        the resistance to remote consultation
                                        and how you can help people change what
                                        they do.
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
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenSix")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ModuleScreen;
