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

type PretestQuizScreenProps = {
  navigation: DrawerNavigationProp<any, any>;
};

const PretestQuizScreen = ({ navigation }: PretestQuizScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [quizId, setQuizId] = useState<string | null>(null);
  const [hasTakenPretest, setHasTakenPretest] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchPretestQuiz();
  }, []);

  const fetchPretestQuiz = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;
        const response = await axios.get(`${BASE_URL}pretest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setQuizQuestions(response.data.data.questions);
        setQuizId(response.data?.data?.id);
      }
    } catch (error) {
      console.error("Error fetching pretest quiz:", error);
      showMessage({
        message: "Failed to load pretest quiz. Please try again.",
        type: "danger",
        icon: "danger",
        backgroundColor: COLORS.danger[600],
        statusBarHeight: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

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

        const response = await axios.post(`${BASE_URL}mark-pretest`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setSubmitLoading(false);
          showMessage({
            message: "Pretest completed successfully!",
            type: "success",
            icon: "success",
            backgroundColor: COLORS.success[600],
            statusBarHeight: 50,
          });
          console.log(parsedUserInfo);
          const updatedUserInfo = {
            ...parsedUserInfo,
            data: { ...parsedUserInfo.data, has_taken_pretest: true },
          };
          console.log(updatedUserInfo);
          await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify(updatedUserInfo)
          );
          navigation.navigate("BottomTabNavigator", { screen: "Home" });
        }
      }
    } catch (error: any) {
      setSubmitLoading(false);
      showMessage({
        message:
          error.response?.data?.message ||
          "Failed to submit pretest. Please try again.",
        type: "danger",
        icon: "danger",
        backgroundColor: COLORS.danger[600],
        statusBarHeight: 50,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#064d7d" />
      </View>
    );
  }

  return (
    <>
      <LinearGradient
        colors={["#064D7D", "#1E88E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pretest Quiz</Text>
        </View>
      </LinearGradient>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Please complete this pretest quiz to help us understand your current
            knowledge level.
          </Text>

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
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Pretest</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  // ... (copy styles from QuizScreen and add/modify as needed)
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
  header: {
    paddingTop: 40, // Increased top padding for status bar
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
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
    color: "black",
  },
  selectedOptionText: {
    color: "white",
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
});

export default PretestQuizScreen;
