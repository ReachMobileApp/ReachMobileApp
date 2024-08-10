import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/src/config";
import Toast from "react-native-toast-message";

interface Answer {
    id: string;
    text: string;
}

interface Quiz {
    id: string;
    question_text: string;
    answers: Answer[];
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
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState<number | null>(null);
    const [moduleName, setModuleName] = useState<string | null>(null);
    const [moduleDescription, setModuleDescription] = useState<string | null>(
        null
    );
    const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});
    const [quizId, setQuizId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorDetails, setErrorDetails] = useState<{
        [key: string]: string[];
    } | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleSelection = (questionId: string, answerId: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const userInfo = await AsyncStorage.getItem("userInfo");
                const selectedModuleId = await AsyncStorage.getItem(
                    "selectedModuleId"
                );
                if (userInfo && selectedModuleId) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    const token = parsedUserInfo.data.auth_token;
                    const moduleId = selectedModuleId;
                    const response = await axios.get(
                        `${BASE_URL}modules/${moduleId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setModuleName(response.data.data.name);
                    setModuleDescription(response.data.data.description);
                    setQuizQuestions(response.data.data.quiz.questions);
                    setQuizId(response.data.data.quiz.id);
                }
            } catch (error) {
                console.error("Error fetching module:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModule();
    }, []);

    const handleSubmit = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;
                setSubmitLoading(true);
                const payload = {
                    quiz_id: quizId,
                    results: quizQuestions.map((question) => ({
                        question_id: question.id,
                        selected_answer_id:
                            selectedAnswers[question.id] || null,
                    })),
                };

                const response = await axios.post(
                    `${BASE_URL}mark-quiz`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    setSubmitLoading(false);
                    Toast.show({
                        type: "success",
                        text1: "Success!",
                        text2: response.data.message,
                    });
                }
                navigation.navigate("BottomTabNavigator", {
                    screen: "Modules",
                });
            }
        } catch (error: any) {
          setSubmitLoading(false);
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: error.response?.data?.message || error.message,
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white pt-2">
            {/* Header */}
            <View className="bg-[#064d7d]">
                <View className="flex-row justify-between items-center py-2 mb-2 px-3">
                    {/* Menu icon */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="p-4">
                <Text className="text-2xl text-[#064d7d] font-bold">
                    {moduleName}
                </Text>

                <View style={{ marginTop: 20 }}>
                    {/* Render quiz questions */}
                    {quizQuestions.map((questionObj, index) => (
                        <View key={questionObj.id} style={{ marginBottom: 20 }}>
                            <View>
                                <Text className="font-bold">
                                    Question {index + 1}:
                                </Text>
                            </View>
                            <View className="border p-3 mt-2 border-[#707070]">
                                <Text className="text-sm">
                                    {questionObj.question_text}
                                </Text>
                                {questionObj.answers.map((option) => (
                                    <TouchableOpacity
                                        key={option.id}
                                        onPress={() =>
                                            handleSelection(
                                                questionObj.id,
                                                option.id
                                            )
                                        }
                                        style={[
                                            styles.radioOption,
                                            selectedAnswers[questionObj.id] ===
                                                option.id &&
                                                styles.selectedOption,
                                        ]}>
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selectedAnswers[
                                                    questionObj.id
                                                ] === option.id &&
                                                    styles.selectedOptionText,
                                            ]}>
                                            {option.text}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
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
                            {submitLoading ? <ActivityIndicator /> : "Submit"}
                        </Text>
                    </TouchableOpacity>
                    {errorMessage && (
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "red", textAlign: "center" }}>
                                {errorMessage}
                            </Text>
                            {errorDetails &&
                                Object.keys(errorDetails).map((key) => (
                                    <View key={key}>
                                        {errorDetails[key].map(
                                            (detail, index) => (
                                                <Text
                                                    key={index}
                                                    style={{
                                                        color: "red",
                                                        textAlign: "center",
                                                    }}>
                                                    {detail}
                                                </Text>
                                            )
                                        )}
                                    </View>
                                ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOption: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedOption: {
    borderColor: '#064d7d',
    backgroundColor: '#064d7d',
  },
  optionText: {
    color: 'black', // Default text color
  },
  selectedOptionText: {
    color: 'white', // Text color when option is selected
  },
});

export default QuizScreen;
