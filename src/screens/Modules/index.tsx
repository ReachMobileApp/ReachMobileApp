import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Module from "@/src/components/Module";
import ModulesButtons from "@/src/components/ModulesButtons";
import Page from "@/assets/images/menuIcons/Page-1.png";
import Page2 from "@/assets/images/menuIcons/Page-2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import { decode } from "html-entities";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { Buffer } from "buffer";
import { LinearGradient } from "expo-linear-gradient";

type ModuleScreenProps = {
  navigation: DrawerNavigationProp<any, any>;
};

const ModuleScreen = ({ navigation }: ModuleScreenProps) => {
  const [showVideo, setShowVideo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<any>(null);
  const [videoFinished, setVideoFinished] = useState(false);

  const stripHtmlTags = (html: string): string => {
    const decodedString = decode(html);
    const cleanString = decodedString
      .replace(/<\/p>/g, "\n\n")
      .replace(/<[^>]*>/g, "");
    const resultString = cleanString.replace(/&nbsp;/g, " ");
    return resultString;
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
            headers: { Authorization: `Bearer ${token}` },
          });
          setModule(response.data.data);
          setVideoFinished(response.data.data.has_completed_quiz);
        }
      } catch (error) {
        console.error("Error fetching module:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModule();
  }, []);

  const toggleVideoNotes = () => {
    setShowVideo((prev) => !prev);
  };

  const handleVideoFinish = () => {
    setVideoFinished(true);
  };

  const isQuizButtonEnabled =
    videoFinished || (module && module.has_completed_quiz);

  const handleQuizPress = () => {
    if (!isQuizButtonEnabled) {
      Alert.alert(
        "Quiz Locked",
        "Please complete the video before taking the quiz.",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("QuizScreen");
  };

  const requestFileWritePermission = async () => {
    // Check if the platform is Android
    if (Platform.OS === "android") {
      try {
        // Request directory permissions on Android
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
          Alert.alert(
            "Permission Denied",
            "File write permission is required to download files."
          );
          return { access: false, directoryUri: null };
        }

        // Return access and directory URI if permission is granted
        return { access: true, directoryUri: permissions.directoryUri };
      } catch (error) {
        console.error("Error requesting file write permission:", error);
        Alert.alert("Error", "An error occurred while requesting permissions.");
        return { access: false, directoryUri: null };
      }
    } else {
      // iOS case: permission is not needed, use document directory
      return { access: true, directoryUri: FileSystem.documentDirectory };
    }
  };

  const downloadFile = async (url: string, noteIndex: number) => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const base64Data = Buffer.from(response.data).toString("base64");
      const hasPermissions = await requestFileWritePermission();
      if (hasPermissions.access) {
        await saveReportFile(
          base64Data,
          hasPermissions.directoryUri || "",
          noteIndex
        );
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      Alert.alert("Download error", "There was an error downloading the file.");
    }
  };
  const saveReportFile = async (
    base64Data: string,
    directoryUri: string,
    noteIndex: number
  ) => {
    try {
      const moduleName =
        module?.name.replace(/[^a-zA-Z0-9]/g, "_") || "download";
      const fileName = `${moduleName}_note${noteIndex + 1}.pdf`;

      let fileUri = "";

      if (Platform.OS === "android") {
        fileUri = await StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          "application/pdf"
        );
      } else {
        fileUri = `${FileSystem.documentDirectory}${fileName}`;
      }

      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert("Success", `File downloaded as ${fileName}`);
    } catch (error: any) {
      console.error("Error saving file:", error);
      Alert.alert("Error", `Could not save file: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#064d7d' />
      </View>
    );
  }

  if (!module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No module data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        {showVideo ? (
          <ScrollView>
            <Module
              header={module.name}
              subheader={stripHtmlTags(extractFirstParagraph(module.content))}
              videoUrl={module.video}
              onVideoFinish={handleVideoFinish}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleVideoNotes}
                style={styles.button}
              >
                <ModulesButtons
                  image={showVideo ? Page : Page2}
                  header={showVideo ? "Read Notes" : "Watch Video"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleQuizPress} style={styles.button}>
                <ModulesButtons image={Page2} header='Take Quiz' />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.notesContainer}>
            <ScrollView>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesContent}>
                {stripHtmlTags(module.content)}
              </Text>
              {module.notes &&
                module.notes.map((note: any, index: number) => (
                  <TouchableOpacity
                    key={note.id}
                    onPress={() => downloadFile(note.note, index)}
                    style={styles.downloadButton}
                  >
                    <Text style={styles.downloadButtonText}>
                      Download Note {index + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={toggleVideoNotes}
                  style={styles.button}
                >
                  <ModulesButtons
                    image={showVideo ? Page : Page2}
                    header={showVideo ? "Read Notes" : "Watch Video"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleQuizPress}
                  style={styles.button}
                >
                  <ModulesButtons image={Page2} header='Take Quiz' />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  errorText: {
    fontSize: 16,
    color: "#064d7d",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
  },
  backButton: {
    padding: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 10,
  },
  notesContainer: {
    flex: 1,
    padding: 16,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#064d7d",
    marginBottom: 12,
  },
  notesContent: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: "#064d7d",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

const extractFirstParagraph = (html: string): string => {
  const match = html.match(/<p>(.*?)<\/p>/);
  return match ? match[1] : ""; // Return the content of the first <p> tag, or an empty string if not found
};

export default ModuleScreen;
