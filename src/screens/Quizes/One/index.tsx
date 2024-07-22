import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../components/QuizCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/src/config";

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({});
  const [quizId, setQuizId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<{ [key: string]: string[] } | null>(null);

  const toggleQuiz = () => {
    setShowQuiz((prev) => !prev);
  };

  const handleSelection = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      const newAnswers = currentAnswers.includes(answerId)
        ? currentAnswers.filter((id) => id !== answerId)
        : [...currentAnswers, answerId];
      return { ...prev, [questionId]: newAnswers };
    });
  };

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.data.auth_token;

          const response = await axios.get(`${BASE_URL}modules/01j1bdmvfg351qkw1fm6cgeq22`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setQuizQuestions(response.data.data.quiz.questions);
          setQuizId(response.data.data.quiz.id);
        }
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    fetchModule();
  }, []);

  const handleSubmit = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;

        const payload = {
          quiz_id: quizId,
          results: quizQuestions.map((question) => ({
            question_id: question.id,
            answers: question.answers.map((answer) => ({
              answer_id: answer.id,
              selected_answer: selectedAnswers[question.id]?.includes(answer.id) || false,
            })),
          })),
        };
        console.log(payload);

        const response = await axios.post(`${BASE_URL}mark-quiz`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        setScore(response.data.score);
        setErrorMessage(null); // Clear any previous error messages
        setErrorDetails(null); // Clear any previous error details
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setErrorDetails(error.response.data.errors);
      } else {
        setErrorMessage('An error occurred while submitting the quiz.');
      }
    }
  };

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
        <Text className="text-2xl text-[#064d7d] font-bold">MODULE 1</Text>

        {/* Render Quiz or Card based on showQuiz state */}
        {showQuiz ? (
          <View style={{ marginTop: 20 }}>
            {/* Render quiz questions */}
            {quizQuestions.map((questionObj, index) => (
              <View key={questionObj.id} style={{ marginBottom: 20 }}>
                <View>
                  <Text className="font-bold">Question {index + 1}:</Text>
                </View>
                <View className="border p-3 mt-2 border-[#707070]">
                  <Text className="text-sm">{questionObj.question_text}</Text>
                  {questionObj.answers.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      onPress={() => handleSelection(questionObj.id, option.id)}
                      className={`my-2 p-2 border ${selectedAnswers[questionObj.id]?.includes(option.id) ? 'border-[#064d7d]' : 'border-gray-300'}`}
                    >
                      <Text className="text-sm">{option.text}</Text>
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
              }}
            >
              <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
                Submit
              </Text>
            </TouchableOpacity>
            {errorMessage && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text>
                {errorDetails && Object.keys(errorDetails).map((key) => (
                  <View key={key}>
                    {errorDetails[key].map((detail, index) => (
                      <Text key={index} style={{ color: 'red', textAlign: 'center' }}>{detail}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
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
                  }}
                >
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
              setSelectedAnswers({});
              setShowQuiz(true); // Show the quiz again
            }}
            className="bg-[#064d7d] mt-4 py-2 px-10 rounded-full"
          >
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
