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
                        header="MODULE 3"
                        subheader="Remote Consulting for Healthcare: ReaCH Training CourseBook"
                        videoId="0s54enQUO_Q"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "This Module will enable you  to summarise the enablers and barriers to implementing a digital communication service about clinical issues, including but not limited to: Technical issues, Communication skills, Ethics, Patient safety, Dealing with consultations through patient intermediaries, Cost, Sustainability"
                        }
                    />
                     <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenThree")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
                   </ScrollView>
                ) : (
                    <View className="flex-1">
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 3
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                Remote Consulting for Healthcare: ReaCH Training
                                CourseBook
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                            This Module will enable you  to summarise the enablers and barriers to implementing a digital communication service about clinical issues, including but not limited to: Technical issues, Communication skills, Ethics, Patient safety, Dealing with consultations through patient intermediaries, Cost, Sustainability
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
                                        1. WHAT METHOD FOR WHAT HEALTH CARE
                                        PURPOSE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You have a number of options for how you
                                        communicate with your patients depending
                                        upon what devices they have access to
                                        AND what telecoms and digital
                                        infrastructure you both have access to.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        There are other considerations in
                                        addition to digital infrastructure and
                                        devices and these relate to the reason
                                        for the remote communication.{" "}
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In our research with healthcare
                                        practitioners and their young adult
                                        patients with long-term conditions, we
                                        found that text, email, and
                                        telephone/video calls had a very
                                        specific purpose for each type of
                                        communication.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. WHAT METHOD FOR WHAT HEALTH CARE
                                        PURPOSE?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Text is good for:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Telephone/video call is good for:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        - Email is good for:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Appointment management, Keeping in
                                        touch, Delivering some forms of mental
                                        health therapy, Providing confidential
                                        contact with patients where often family
                                        is involved, Difficult prognosis
                                        conversation, Delivering education and
                                        instruction, Taking mental health
                                        therapies, Sending complex information,
                                        Sending summary of the discussion,
                                        Sending test results, Sending a
                                        photograph of a clinical sign, Ordering
                                        medication or supplies.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. PATIENT IN UK
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In a UK study with young adults living
                                        with long-term conditions, health
                                        workers appeared to be more concerned
                                        about patient safety than patients were.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        This doesn’t necessarily mean that the
                                        young adults don’t care about their
                                        safety but more that they expect the
                                        health professionals to be automatically
                                        protecting their safety.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        They don’t think about safety in
                                        relation to remotely receiving
                                        healthcare because they expect the
                                        health workers to have dealt
                                        appropriately with all the important
                                        issues before starting the new service.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We also found both health professionals
                                        and patients had a common-sense approach
                                        to safety. For example, a patient
                                        wouldn’t send an email about an urgent
                                        health need late at night because they
                                        knew the nurse would be not on duty.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. WHAT KINDS OF PATIENT SAFETY ARE WE
                                        TALKING ABOUT?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Take each of these questions and think
                                        about how you will ensure that you
                                        protect your patients’ safety in each of
                                        these scenarios.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Am I calling/speaking to the right
                                        patient?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Will patients try to contact me with
                                        serious health problems when I am not on
                                        duty/answering calls?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Will someone be available when the
                                        patient calls?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Can the patient use the technology?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Will the patient misinterpret my
                                        message?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What other safety issues can you think
                                        of and how might you mitigate them?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. COSTS AND WORKLOAD
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Previously, Remote consulting had only
                                        been studied in a non-pandemic context.
                                        What we know about its feasibility,
                                        impact, costs, and safety has been
                                        generated in the care of long-term
                                        conditions, primary care, and post-op
                                        outpatient or ambulatory care.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In the pre-COVID world, health
                                        professionals were very concerned with
                                        all the issues we are discussing in this
                                        module. They were particularly concerned
                                        about their workload. If done well,
                                        remote consulting can routinely replace
                                        face-to-face care. If done badly it will
                                        result in duplication.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In the pandemic, these issues remain,
                                        but the reason for moving healthcare
                                        into a remote service has become
                                        imperative for the new, and the
                                        overriding, issue of protecting the
                                        health of the health workers and of the
                                        population with health needs.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Remote consulting brings with it a
                                        unique challenge around trust. The
                                        patient cannot see you and they may or
                                        may not have met you before. Should they
                                        trust you? They will want to know which
                                        health facility that you work for, they
                                        may ask whether they have ever met you,
                                        or do you have access to any clinical
                                        notes about them.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        However, the trust and rapport building
                                        that is needed to ensure that remote
                                        consulting is effective may take some
                                        time, especially during the first few
                                        remote appointments. Time to explain
                                        which health facility you work with, and
                                        to find and read their records in
                                        advance, may replace some of the time
                                        you save in travel. Think broadly about
                                        the costs of remote consulting.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Remote consulting brings with it unique
                                        challenges around trust.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Patients cannot see you and they may or
                                        may not have met you before. Should they
                                        trust you?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        They will want to know the health
                                        facility that you work for, they may ask
                                        whether they have ever met you, or do
                                        you have access to any clinical notes
                                        about them’.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Remote consulting may save costs on
                                        travel time for both you and your
                                        patient, it may cut down on incidental
                                        small talk that you have with people
                                        when you meet face to face, it may even
                                        shorten the appointment because some
                                        people can get to the point more quickly
                                        in a remote consultation.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        However, the trust and rapport building
                                        that is needed to ensure that remote
                                        consulting is effective may take some
                                        time, especially during the first few
                                        remote appointments. Time to explain
                                        which health facility you work with, and
                                        to find and read their records in
                                        advance, may replace some of the time
                                        you save in travel.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Think broadly about the costs of remote
                                        consulting
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Remote in addition to face-to-face? NOT
                                        during the pandemic!
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What costs will you/your service incur?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        What cost savings will you/your service
                                        incur?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Who will fund your “airtime”?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Can the patient afford “airtime”?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How will care be paid for when delivered
                                        remotely?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. ACTIVITY: START TO MAKE PLAN ABOUT
                                        THE COSTS OF DELIVERING CARE REMOTELY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        ANSWER THE QUESTIONS ON THE LAST SLIDE
                                        FOR YOUR SERVICE AND MAKE A PLAN FOR:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        A) HOW WILL YOU FIND THE ANSWERS TO THE
                                        QUESTIONS?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        B) WHO WILL YOU NEED TO NEGOTIATE COSTS
                                        AND COST SAVINGS WITH?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        C) WHAT INFORMATION WILL PERSUADE THE
                                        DECISION-MAKERS?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In this activity, use the points on the
                                        previous slide to start to plan what the
                                        cost and workload impact of remote
                                        consulting may have on you, your
                                        colleagues, your patient, and the whole
                                        service.{" "}
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Remember that we are implementing remote
                                        consulting NOW because it will save the
                                        lives of populations and very important
                                        health workers. The costs of not
                                        delivering care this way are
                                        unthinkable!
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        7. ETHICAL CONSIDERATIONS
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ethical considerations fall into these
                                        main areas:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Duty of care
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Boundaries
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Equity
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Privacy
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Consent
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Confidentiality
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        8. DUTY OF CARE & BOUNDARIES
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Duty of care
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        when are you on duty and when are you
                                        off duty? This is particularly relevant
                                        when you and your patients use
                                        asynchronous remote consulting so the
                                        patient can send a message whenever they
                                        want to’.
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Boundaries
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Related to the duty of care are
                                        relationships and boundaries. SMS
                                        messages with emojis at the end are
                                        informal ways of communicating which can
                                        make a professional health worker feel
                                        uncomfortable. Setting professional
                                        expectations about how you communicate
                                        is important for you to consider.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        9. EQUITY & PRIVACY
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Equity
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Equity can be an issue, even in a
                                        pandemic when you will need everyone to
                                        be offered the same access to
                                        healthcare. If remote consulting relies
                                        on particular devices or access to
                                        airtime funds, it can have an impact on
                                        equality of access to care. In usual
                                        times we can fall into the trap of
                                        making assumptions about whether a
                                        particular patient has the digital
                                        literacy to be able to communicate by
                                        email for example. These judgments can
                                        affect equity in healthcare provision.
                                        In pandemic times we need to undertake
                                        most of our consulting remotely and both
                                        health workers and patients will have
                                        upskilled themselves in
                                        telecommunications as a greater
                                        priority.
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Privacy
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We talked a little earlier about privacy
                                        considerations around the location of
                                        the consultation, but you will also need
                                        to balance the ethics of privacy along
                                        with that of equity. For example, when
                                        you need to deliver healthcare to a
                                        patient through a family intermediary
                                        because of the technical capability of
                                        the patient themselves. There are no
                                        right and wrong answers here and as
                                        professionals, it is a matter of
                                        weighing up the decisions that lead to
                                        the best outcomes for the patient.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        10. CONSENT & CONFIDENTIALITY
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Consent
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Consent to consult remotely is important
                                        but in such emergencies, we may wish to
                                        consider implied consent if the patient
                                        asks to telephone or text you.
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        If you call the patient unexpectedly,
                                        and therefore have no idea about the
                                        circumstances in which they are
                                        answering the phone, it is best practice
                                        to check that they are able to take the
                                        call from a privacy, emotional, and
                                        physical perspective.
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        This is a way of checking in with the
                                        consent to continue with the call.
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        Confidentiality
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Confidentiality has been shown to be the
                                        most concerning patient safety issue for
                                        young adult patients. They often
                                        preferred asynchronous text and email as
                                        a method of communication with their
                                        health provider but didn’t like the idea
                                        of the texts flashing across their
                                        screen when others may easily see and
                                        read them.
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        11. READ AND COMPLETE THE ETHICS
                                        ACTIVITY. ETHICAL CONSIDERATIONS WHEN
                                        COMMUNICATING DIGITALLY:
                                        CONFIDENTIALITY, PRIVACY AND CONSENT,
                                        DUTY OF CARE, PATIENT SAFETY, AND EQUITY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1) Mr. Khan case study
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2) WhatsApp group case study
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        These case studies can be undertaken
                                        alone or can also be used when you are
                                        cascading the training to health
                                        workers.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        12. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now have a better
                                        understanding of the costs and ethical
                                        considerations associated with remote
                                        consulting. Think about how these fit in
                                        with your own healthcare service and
                                        practice.
                                    </Text>
                                </View>
                            </View>
                <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenThree")}>
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
