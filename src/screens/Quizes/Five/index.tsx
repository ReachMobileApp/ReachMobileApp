import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../components/QuizCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/src/config";

interface Quiz {
    id: string;
    question_text: string;
    answers: { id: string; text: string; truth_value: boolean }[];
}

interface ApiResponse {
    data: {
        quiz: {
            questions: Quiz[];
        };
    };
}

type QuizScreenProps = {
    navigation: DrawerNavigationProp<any, any>;
};

const QuizScreen = ({ navigation }: QuizScreenProps) => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<null[][]>([]);

    const toggleQuiz = () => {
        setShowQuiz((prev) => !prev);
    };

    const handleSelection = (questionIndex: number, optionIndex: number, selection: boolean) => {
        const updatedAnswers = selectedAnswers.map((answer, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedOptions = answer.map((option, oIndex) => {
                    if (oIndex === optionIndex) {
                        return selection; // Assign 'true' or 'false' based on user selection
                    }
                    return option;
                });
                return updatedOptions;
            }
            return answer;
        });
      setSelectedAnswers(updatedAnswers);
    };

   
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    const token = parsedUserInfo.data.auth_token;

                    const response = await axios.get<ApiResponse>(
                        `${BASE_URL}modules/01j1bdmvz1zatrjvb1wwvp8htt`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const quizData = response.data.data.quiz.questions;
                    setQuizQuestions(quizData);
                    console.log(quizData);
                    setSelectedAnswers(quizData.map(question => question.answers.map(() => null)));
                }
            } catch (error) {
                console.error('Error fetching module:', error);
            }
        };

        fetchQuiz();
    }, []);

    return (
        <ScrollView className="flex-1 bg-white pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center pt-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity onPress={() => navigation.goBack()} className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="p-4">
                <Text className="text-2xl text-[#064d7d] font-bold">MODULE 5</Text>
                
                {/* Render Quiz or Card based on showQuiz state */}
                {showQuiz ? (
                    <View style={{ marginTop: 20 }}>
                        {/* Render quiz questions */}
                        {quizQuestions.map((questionObj, index) => (
                            <View key={index} style={{ marginBottom: 20 }}>
                                <View>
                                    <Text className="font-bold">Question {index + 1}:</Text>
                                </View>
                                <View className="border p-3 mt-2 border-[#707070]">
                                    <Text className="text-sm">{questionObj.question_text}</Text>
                                    <View className="flex flex-row justify-end px-3 gap-2">
                                        <Text>True</Text>
                                        <Text>False</Text>
                                    </View>
                                    {questionObj.answers.map((option, optionIndex) => (
                                        <View key={optionIndex} className="flex flex-row justify-between items-center my-2">
                                            <Text className="w-9/12">{option.text}</Text>
                                            <View className="flex flex-row gap-4">
                                                <TouchableOpacity
                                                    onPress={() => handleSelection(index, optionIndex, true)}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderWidth: 1,
                                                        borderColor: "black",
                                                        backgroundColor: selectedAnswers[index][optionIndex] === true ? "#064d7d" : "transparent",
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    onPress={() => handleSelection(index, optionIndex, false)}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderWidth: 1,
                                                        borderColor: "black",
                                                        backgroundColor: selectedAnswers[index][optionIndex] === false ? "#064d7d" : "transparent",
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                        {/* Submit button */}
                        <TouchableOpacity
                            //onPress={handleSubmit}
                            style={{
                                backgroundColor: "#064d7d",
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginTop: 20,
                            }}>
                            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : score === null ? (
                    <View className="py-5 px-2">
                        {/* Render your card component here */}
                        <Card attempt={3} time="20 mins" />
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            {!showQuiz && (
                                <TouchableOpacity
                                    onPress={toggleQuiz}
                                    style={{
                                        backgroundColor: "#064d7d",
                                        width: "80%",
                                        padding: 10,
                                        borderRadius: 10,
                                    }}>
                                    <Text style={{ color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
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
                    <Text className="text-lg text-center">You have to score up to 80% before you can continue</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setScore(null);
                            setSelectedAnswers(
                                quizQuestions.map((question) => question.answers.map(() => null))
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
                    <Text className="text-lg">{score}%,</Text>
                    <Text className="text-lg text-center">Congratulations! You have successfully completed the module.</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default QuizScreen;
