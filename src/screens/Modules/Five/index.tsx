import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Module from "@/src/components/Module";
import ModulesButtons from "@/src/components/ModulesButtons";
import Page from "@/assets/images/menuIcons/Page-1.png";
import Page2 from "@/assets/images/menuIcons/Page-2.png";
import { Hyperlink } from 'react-native-hyperlink';

type ModuleScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};

const ModuleScreen = ({ navigation }: ModuleScreenProps) => {
    const [showVideo, setShowVideo] = useState(true);

    const toggleVideoNotes = () => {
        setShowVideo((prev) => !prev);
    };

    return (
        <View className="flex-1 bg-white  ">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center  mb-2 px-3">
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
                        header="MODULE 5"
                        subheader="What is my plan for delivering my healthcare work remotely?"
                        videoId="WqXXsQeicHU"
                        duration="1 hr"
                        learningOutcomeHeader="Learning Outcome:"
                        learningOutcome={
                            "At the end of this module, you should be able to develop a plan for remote consulting with patients where you and the patient/supporter use digital communication."
                        }
                    />
                       <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenFive")}>
                        <ModulesButtons image={Page2} header="Take Quiz" />
                    </TouchableOpacity>
                </View>
                   </ScrollView>
                ) : (
                    <View className="flex-1">
                        <View className="p-4">
                            <Text className="text-2xl text-[#064d7d] font-bold ">
                                MODULE 5
                            </Text>
                            <Text className="text-sm mb-1 text-gray-500 ">
                                What is my plan for delivering my healthcare
                                work remotely?{" "}
                            </Text>
                            <Text className="text-sm text-red-500 mb-3">
                                1 hr
                            </Text>
                            <Text className="mb-2 text-[#183745] font-bold text-lg">
                                Learning Outcome:{" "}
                            </Text>
                            <Text className="mb-2 text-[#183745] text-base">
                                At the end of this module, you should be able to
                                develop a plan for remote consulting with
                                patients where you and the patient/supporter use
                                digital communication.
                            </Text>
                        </View>
                        <ScrollView className="m-4 flex-1">
                            <View className="p-2">
                                <Text className="mb-3 text-[#707070] text-bold text-lg">
                                    Notes:
                                </Text>
                                <View>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        MODULE 5: WHAT IS MY PLAN FOR DELIVERING
                                        MY HEALTHCARE WORK REMOTELY?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        1. LEARNING OUTCOMES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        At the end of this module, you should be
                                        able to develop a plan for remote
                                        consulting with patients where you and
                                        the patient/supporter use digital
                                        communication.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        2. A FRAMEWORK TO HELP PLANNING
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We will define Patient-centred access to
                                        health care as the opportunity for
                                        patients to have their healthcare needs
                                        fulfilled
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        This may seem fairly obvious but the key
                                        thing is looking at it from the
                                        patient’s point of view rather than the
                                        health service”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        3. PATIENT-CENTRED ACCESS TO HEALTH CARE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        As a matter of emphasis, we will
                                        reiterate this, “Patient-centred access
                                        to health care is the opportunity to
                                        have their healthcare needs fulfilled”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        this depends on the following 2 points:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Ability of patients/populations
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Accessibility of healthcare services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        This is a diagram of the idea of
                                        patient-centered access with the
                                        accessibility of the providers on the
                                        left side and the ability of patients to
                                        access healthcare on the right.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The arrow along the bottom represents
                                        the process for people accessing
                                        healthcare and we will look into this in
                                        more detail”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Take some time to study the content of
                                        this slide and the diagram, and relate
                                        it to the previous two slides, that is,
                                        the factors that need to be considered
                                        on the side of patients and that of the
                                        health care worker/health system
                                        regarding access to healthcare services.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        These factors and their relationships
                                        and how they influence access to
                                        healthcare will be discussed in detail
                                        in the following slides
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Screenshot of Figure 1 from
                                        Patient-centred access to health care:
                                        conceptualizing access at the interface
                                        of health systems and populations
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        As you were earlier informed in the
                                        previous slides, the present diagram
                                        gives more detail about the process of
                                        people accessing healthcare. It takes
                                        the arrow from the bottom of the
                                        previous diagram and expands on what's
                                        going on.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        In the very bottom row are the steps for
                                        people accessing health care,
                                        representing their ability to do this.
                                        In the top row is the accessibility of
                                        healthcare services. The diagram shows
                                        how the patient and the healthcare
                                        provider/ the health system interact to
                                        facilitate access to needed healthcare
                                        services.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        We will be looking at aspects of this
                                        through this module and thinking about
                                        how it applies to remote consulting.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Screenshot of Figure 2 from
                                        Patient-centred access to health care:
                                        conceptualizing access at the interface
                                        of health systems and populations.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        4. THE PATIENT AND THE PROVIDER FACTORS
                                        THAT INFLUENCE ACCESS TO HEALTHCARE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        From here till the end of this module,
                                        we will consider in detail the
                                        corresponding factors of patients and
                                        that of the healthcare provider/health
                                        services that influence patient-centered
                                        access to healthcare.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        5. ABILITY OF PATIENTS AND
                                        APPROACHABILITY OF SERVICES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Patient’s ability to perceive healthcare
                                        need
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The first step in patients seeking
                                        healthcare is the ability to realize
                                        they need healthcare which is influenced
                                        by the following 4 under-listed points
                                        which are in the domain of the patient:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Understanding of health and
                                        healthcare (health literacy) – what does
                                        being healthy/ill mean to them and what
                                        can healthcare provide?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Health beliefs – what they believe is
                                        the cause of illness.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Trust in healthcare.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Expectation of health care – a
                                        patient with symptoms that they know
                                        cannot be helped by healthcare might not
                                        seek healthcare and this may be quite
                                        appropriate. It might be a self-limiting
                                        illness or serious illness and patients
                                        think there is nothing that can be done
                                        and so they don't seek healthcare
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        6. ABILITY OF PATIENTS AND
                                        APPROACHABILITY OF SERVICES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Approachability of healthcare services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        The corresponding points on the part of
                                        the provider of health services or the
                                        health system are listed below:
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Transparency – a transparent process
                                        for patients to be able to contact
                                        service.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Information – information about how
                                        to do this and what the health services
                                        can provide.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Outreach – there might be some
                                        outreach to the community advertising
                                        the health services.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Screening – where health workers
                                        visit households they may screen
                                        households and tell them about services.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        7. ACTIVITY: HOW WILL YOU PLAN REMOTE
                                        CONSULTING TO TAKE ACCOUNT OF THESE
                                        ISSUES?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Understanding of health and health
                                        care (health literacy)
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Health beliefs
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Trust in healthcare
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Expectations of health care
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Approachability of healthcare services
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        1. Transparency
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        2. Information
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        3. Outreach
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-4">
                                        4. Screening
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        8. EXAMPLES OF PLANNING FOR REMOTE
                                        CONSULTING
                                    </Text>
                                    <Text className="mb-1 text-[#707070] text-base">
                                        It is important that when you are
                                        planning for remote consulting, the
                                        following under listed points are taken
                                        into cognizance and are well carried out
                                        so as to enhance the success of remote
                                        consulting”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Communicate with the community about how
                                        health care can be provided remotely,
                                        what can be provided and what will
                                        happen when a patient needs hands-on
                                        examination or treatment.
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        Ensure the community and individual
                                        patients understand who is providing the
                                        remote consulting.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Make screening phone calls to households
                                        instead of visits.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Explain why remote consulting is
                                        important during pandemics.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        9. ABILITY TO SEEK HEALTH CARE AND
                                        ACCEPTABILITY OF SERVICES
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        How will these issues influence how you
                                        deliver remote consulting as a health
                                        worker already familiar with the
                                        communities you serve? If you worked for
                                        a company providing remote consulting
                                        from a distant city, what else would you
                                        need to consider? Pause and write some
                                        notes for yourself.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        10. SOME EXAMPLES . . . . .
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        Reflect on the immediate previous slide,
                                        how does the content relate to the
                                        points stated below in the present
                                        slide?
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        As a local health worker, I know that
                                        patients only want to see a female
                                        health worker.
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        For some people accessing a mobile phone
                                        might be difficult, even if someone in
                                        their household owns one. I may need to,
                                        for example, accept messages from
                                        neighbors and arrange to ring the
                                        patient back at a specific time when
                                        they can be next to a phone.
                                    </Text>
                                    <Text className="mb-2  text-[#707070] text-base">
                                        As a remote consulting provider from a
                                        distant city, I need to learn about how
                                        the local culture influences how people
                                        seek health care and demonstrate that my
                                        role as a health worker is similar to
                                        that of health workers locally.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        11. AVAILABILITY AND ABILITY TO REACH
                                        HEALTH CARE
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ">
                                        Again, note the content on the two
                                        halves of this slide and note that the
                                        content on both sides complements each
                                        other to enable this aspect of
                                        patient-centered care. It is also
                                        noteworthy the rationale of allowing
                                        patients a physical consultation as
                                        opposed to remote consulting”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Make notes on what else do you need to
                                        do to enable your patients to reach the
                                        health care they need using mobile
                                        consulting?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        12. COST ISSUES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        It is important to note here that
                                        certain salient differences exist
                                        between face-to-face and remote
                                        consulting. One of these differences is
                                        the cost of healthcare, that is, who
                                        needs to pay what cost? How is the cost
                                        estimated? how do you make the payment/
                                        how is the money collected?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        All these questions and others are what
                                        should be the focus of this aspect of
                                        our discussion, and to say the least, it
                                        is not exhausted, as you are allowed to
                                        think about it and suggests acceptable/
                                        feasible ways of working around the
                                        likely challenges
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Cost of contacting the clinic – should
                                        you have a phone number that is free to
                                        call?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Cost of running their mobile phone
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Collection of fees from patients when
                                        remote consulting
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Affordability{" "}
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Replacement of face-to-face consulting –
                                        but may be slow to start with as an
                                        unfamiliar terrain
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Avoid duplication of effort – e.g. if a
                                        patient with high blood pressure calls
                                        the clinic, a health worker may
                                        undertake a phone consultation and then
                                        ask them to come to the clinic to
                                        measure their blood pressure and the
                                        conversation may be repeated again.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ways of reducing duplication of effort
                                        could include having a blood pressure
                                        machine in the clinic waiting room so
                                        the patient doesn’t
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        have to see a health worker or have
                                        someone in the community who is trained
                                        to take blood pressure measurements.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Paying for airtime to phone patients
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Cost of free phone number and staff time
                                        to receive calls
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        13. ABILITY TO ENGAGE AND
                                        APPROPRIATENESS OF HEALTH CARE PROVIDED
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Patient’s ability to engage
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Empowerment – patients need to feel able
                                        to communicate with health workers and
                                        feel able to carry out instructions
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Information – patients need to be able
                                        to understand the information as
                                        provided by healthcare workers.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Adherence – This is important so they
                                        (patients) are able to take necessary
                                        treatments appropriately
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Caregiver support – all of this can be
                                        helped if the patient has some sort of
                                        support from either of relatives,
                                        neighbors, friends and other appropriate
                                        individuals”.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Appropriateness of healthcare provided
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Technical and interpersonal quality –
                                        healthcare workers need to be
                                        technically competent in providing the
                                        right diagnosis and treatment.
                                        Healthcare workers also need to be able
                                        to communicate well with patients and
                                        show empathy.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Adequacy – there needs to be adequate
                                        treatment for patients. This is about
                                        the availability of drugs and equipment
                                        but also the quality, the way in which
                                        this is delivered so it overlaps with
                                        technical and interpersonal quality.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Coordination and continuity – patients
                                        may need following up or further tests
                                        and monitoring.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Think back over the modules you have
                                        undertaken so far, and consider what is
                                        important to consider under these
                                        headings when planning remote consulting
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        14. QUESTIONS TO CONSIDER
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Again, think about the importance of
                                        good communication between patients and
                                        healthcare workers to enable the
                                        achievement of patient-centered care
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Ability to engage
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        Empowerment: how will I encourage the
                                        patient to take action when talking to
                                        them by phone?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        Information: how do I check they have
                                        and understand the information they need
                                        when on the phone?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        Adherence: how can I check adherence –
                                        can they send me a photo of their drug
                                        packet?”
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base ml-2">
                                        Caregiver support: should I ask the
                                        patient to involve a member of their
                                        family in the remote consultation so I
                                        can be confident the patient hears and
                                        understands what I am saying?
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Appropriateness, Technical and
                                        interpersonal quality
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base"></Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Adequacy Co-ordination and continuity
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        How do I ensure I am using my clinical
                                        skills well in remote consulting, for
                                        example taking time to reflect afterward
                                        or phoning the patient back at a later
                                        time. How do I check the patient
                                        understands me and trusts me? How do I
                                        arrange for a patient to be examined,
                                        and access a test or treatment?
                                    </Text>

                                    <Text className="mb-2 text-[#707070] text-base">
                                        15. SUMMARY
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        You should now have a better
                                        understanding of the considerations
                                        surrounding a patient-centered approach
                                        to healthcare and started developing
                                        your own plan for how you can deliver
                                        your healthcare work remotely.
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        16. REFERENCES
                                    </Text>
                                    <Text className="mb-2 text-[#707070] text-base">
                                        Patient-centered access to health care:
                                        conceptualizing access at the interface
                                        of health systems and populations
                                        Jean-Frederic Levesque, Mark F Harris,
                                        and Grant Russell. International Journal
                                        for Equity in Health 2013, 12:18 You can
                                        download the full article here
                                        http://www.equityhealthj.com/content/12/1/18
                                    </Text>
                                    <Hyperlink linkDefault={true}>
                                        <Text className="text-orange-950 underline">
                                            http://www.equityhealthj.com/content/12/1/18
                                        </Text>
                                    </Hyperlink>
                                </View>
                            </View>
                <View className="mb-10 p-2">
                    <TouchableOpacity onPress={toggleVideoNotes}>
                        <ModulesButtons
                            image={showVideo ? Page : Page2}
                            header={showVideo ? "Read Notes" : "Watch Video"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("QuizScreenFive")}>
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
