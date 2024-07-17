import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../components/QuizCard";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type QuizScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};
const quizQuestions = [
    {
        header: "Question 1:",
        question: "Patient safety in remote consulting entails the following: ",
        options: [
            { text: "Ensuring that you speak to the right patient" },
            {
                text: "Ensuring that the internet connection displays a strong signal and does not interfere communication",
            },
            {
                text: "Ensuring that the technology that is used is familiar to the patient",
            },
            {
                text: "Ensuring that the text message is not seen by another person apart from the patient",
            },
        ],
    },
    {
        header: "Question 2:",
        question:
            "The following statements are true about ethical consideration in remote consulting: ",
        options: [
            { text: "Confidentiality is a problem in text messages" },
            {
                text: "Short messages with emojis can make the health worker uncomfortable",
            },
            {
                text: "It is not right to provide remote consulting via a family intermediary",
            },
            {
                text: "Duty of care is particularly relevant when asynchronous remote",
            },
        ],
    },
    {
        header: "Question 3:",
        question:
            "The following is not important in ethical considerations in remote consulting",
        options: [
            { text: "Equity" },
            { text: "Quality of Care" },
            { text: "Accountability" },
            { text: "Consent" },
        ],
    },
];

const correctAnswers = [
    { options: ["true", "false", "false", "true"] }, // Assuming Phone Calls is correct for Question 1
    { options: ["true", "true", "false", "true"] }, // Assuming Synchronous Interaction is correct for Question 2
    { options: ["false", "true", "false", "false"] }, // Assuming all options are correct for Question 3
];

const QuizScreen = ({ navigation }: QuizScreenProps) => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const toggleQuiz = () => {
        setShowQuiz((prev) => !prev);
    };
    const [selectedAnswers, setSelectedAnswers] = useState(
        quizQuestions.map((question) => ({
            options: question.options.map(() => null), // null initially, can be 'true' or 'false'
        }))
    );

    const handleSelection = (
        questionIndex: number,
        optionIndex: number,
        selection: string
    ) => {
        const updatedAnswers = selectedAnswers.map((answer, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedOptions = answer.options.map((option, oIndex) => {
                    if (oIndex === optionIndex) {
                        return selection; // Assign 'true' or 'false' based on user selection
                    }
                    return option;
                });
                return { ...answer, options: updatedOptions };
            }
            return answer;
        });
        setSelectedAnswers(updatedAnswers as { options: null[] }[]);
    };
    
    const updateModuleStatus = async (
        moduleId: string,
        status: string,
        score?: number
    ) => {
        try {
            const db = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const userDocRef = doc(
                    db,
                    "users_data",
                    user.uid,
                    "modules",
                    moduleId
                );
                const updateData: any = { status };
                if (score !== undefined) {
                    updateData.score = score;
                }
                await updateDoc(userDocRef, updateData);
                console.log("Document successfully updated");
            } else {
                console.error("No user is signed in");
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleSubmit = async () => {
        let correctCount = 0;
        let totalCount = 0;
        selectedAnswers.forEach((answer, index) => {
            answer.options.forEach((option, optionIndex) => {
                if (option !== null) {
                    // Ensure the question was answered
                    totalCount++;
                    if (option === correctAnswers[index].options[optionIndex]) {
                        correctCount++;
                    }
                }
            });
        });

        const scorePercentage = Math.round((correctCount / totalCount) * 100);
        setScore(scorePercentage);

        if (scorePercentage >= 80) {
            setShowQuiz(false);
            await updateModuleStatus("module7", "completed", scorePercentage);
        } else {
            setShowQuiz(false);
        }
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
                   
                </View>
            </View>
            <View className="p-4">
                <Text className="text-2xl text-[#064d7d] font-bold ">
                    MODULE 3
                </Text>
                <Text className="text-sm mb-1 text-gray-500 ">
                    Remote Consulting for Healthcare: ReaCH Training CourseBook
                </Text>

                {/* Render Quiz or Card based on showQuiz state */}
                {showQuiz ? (
                    <View style={{ marginTop: 20 }}>
                        {/* Render quiz questions */}
                        {quizQuestions.map((questionObj, index) => (
                            <View key={index} style={{ marginBottom: 20 }}>
                                <View>
                                    <Text className="font-bold ">
                                        {questionObj.header}
                                    </Text>
                                </View>
                                <View className="border p-3 mt-2 border-[#707070]">
                                    <Text className="text-sm">
                                        {questionObj.question}
                                    </Text>
                                    <View className="flex flex-row justify-end px-3 gap-2">
                                        <Text>True</Text>
                                        <Text>False</Text>
                                    </View>
                                    {questionObj.options.map(
                                        (option, optionIndex) => (
                                            <View
                                                key={optionIndex}
                                                className="flex flex-row justify-between items-center my-2">
                                                <Text className="w-9/12">
                                                    {option.text}
                                                </Text>
                                                <View className="flex flex-row gap-4">
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            handleSelection(
                                                                index,
                                                                optionIndex,
                                                                "true"
                                                            )
                                                        }
                                                        style={{
                                                            width: 20, // Adjusted for visibility
                                                            height: 20, // Adjusted for visibility
                                                            borderWidth: 1,
                                                            borderColor:
                                                                "black",
                                                            backgroundColor:
                                                                selectedAnswers[
                                                                    index
                                                                ].options[
                                                                    optionIndex
                                                                ] === "true"
                                                                    ? "#064d7d"
                                                                    : "transparent",
                                                        }}></TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            handleSelection(
                                                                index,
                                                                optionIndex,
                                                                "false"
                                                            )
                                                        }
                                                        style={{
                                                            width: 20, // Adjusted for visibility
                                                            height: 20, // Adjusted for visibility
                                                            borderWidth: 1,
                                                            borderColor:
                                                                "black",
                                                            backgroundColor:
                                                                selectedAnswers[
                                                                    index
                                                                ].options[
                                                                    optionIndex
                                                                ] === "false"
                                                                    ? "#064d7d"
                                                                    : "transparent",
                                                        }}></TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                        {/* Submit button */}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={{
                                backgroundColor: "#064d7d",
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginTop: 20,
                            }}>
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: 16,
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : score === null ? (
                    <View className="py-5 px-2">
                        {/* Render your card component here */}
                        <Card attempt={3} time="20 mins" />
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                            }}>
                            {!showQuiz && (
                                <TouchableOpacity
                                    onPress={toggleQuiz}
                                    style={{
                                        backgroundColor: "#064d7d",
                                        width: "80%",
                                        padding: 10,
                                        borderRadius: 10,
                                    }}>
                                    <Text
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}>
                                        Start Quiz
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ) : null}
            </View>

            {score !== null && score < 80 && (
                <View className="items-center mt-4 border px-5 mx-5 py-5 text-center flex justify-center">
                    <Text className="text-lg">{score}%,</Text>
                    <Text className="text-lg text-center">
                        {" "}
                        You have to score up to 80% before you can continue
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setScore(null);
                            setSelectedAnswers(
                                quizQuestions.map((question) => ({
                                    options: question.options.map(() => null),
                                }))
                            );
                            setShowQuiz(true); // Show the quiz again
                        }}
                        className="bg-[#064d7d] mt-4 py-2 px-10 rounded-full">
                        <Text className="text-white font-bold">Try Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {score !== null && score >= 80 && (
                <View className="items-center mt-4 border px-5 mx-5 py-5 text-center flex justify-center">
                    <Text>Congratulations! you scored {score}%</Text>
                    <Text>You have successfully completed this module</Text>
                    <Text>You have earned yourself a badge</Text>
                    <Text>Click the button below to view </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("BottomTabNavigator", {
                                screen: "Profile",
                            })
                        }
                        className="bg-[#064d7d] mt-4 py-2 px-10 rounded-full">
                        <Text className="text-white font-bold">
                            Go to Badges
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Render Start Quiz button */}
        </ScrollView>
    );
};

export default QuizScreen;
