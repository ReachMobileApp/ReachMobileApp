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
import { LinearGradient } from "expo-linear-gradient";
import { showMessage } from "react-native-flash-message";
import { COLORS } from "@/src/theme/colors";

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
        const selectedModuleId = await AsyncStorage.getItem("selectedModuleId");
        if (userInfo && selectedModuleId) {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.data.auth_token;
          const moduleId = selectedModuleId;
          const response = await axios.get(`${BASE_URL}modules/${moduleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
            selected_answer_id: selectedAnswers[question.id] || null,
          })),
        };

        const response = await axios.post(`${BASE_URL}mark-quiz`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setSubmitLoading(false);
          // Toast.show({
          //   type: "success",
          //   text1: "Success!",
          //   text2: response.data.message,
          // });
          showMessage({
            message: response.data.message,
            type: "success",
            icon: "success",
            backgroundColor: COLORS.success[600],
            statusBarHeight: 22,
          });
        }
        navigation.navigate("BottomTabNavigator", {
          screen: "Modules",
        });
      }
    } catch (error: any) {
      setSubmitLoading(false);
      // Toast.show({
      //   type: "error",
      //   text1: "Error!",
      //   text2: error.response?.data?.message || error.message,
      // });

      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        icon: "danger",
        backgroundColor: COLORS.danger[600],
        statusBarHeight: 22,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#064d7d' />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#064D7D", "#1E88E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name='arrow-back' size={28} color='white' />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.title}>{moduleDescription}</Text>

        {quizQuestions.map((questionObj, index) => (
          <View key={questionObj.id} style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Question {index + 1}:</Text>
            <View style={styles.questionBox}>
              <Text style={styles.questionText}>
                {questionObj.question_text}
              </Text>
              {questionObj.answers.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelection(questionObj.id, option.id)}
                  style={[
                    styles.radioOption,
                    selectedAnswers[questionObj.id] === option.id &&
                      styles.selectedOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswers[questionObj.id] === option.id &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>

        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            {errorDetails &&
              Object.keys(errorDetails).map((key) => (
                <View key={key}>
                  {errorDetails[key].map((detail, index) => (
                    <Text key={index} style={styles.errorDetail}>
                      {detail}
                    </Text>
                  ))}
                </View>
              ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  radioOption: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  selectedOption: {
    borderColor: "#064d7d",
    backgroundColor: "#064d7d",
  },
  optionText: {
    color: "black", // Default text color
  },
  selectedOptionText: {
    color: "white", // Text color when option is selected
  },
  header: {
    backgroundColor: "#064d7d",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#064d7d",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#064d7d",
    marginBottom: 10,
  },
  questionBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },

  submitButton: {
    backgroundColor: "#064d7d",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  errorMessage: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  errorDetail: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
export default QuizScreen;
