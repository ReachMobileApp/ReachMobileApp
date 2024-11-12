import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { Buffer } from "buffer";
import { BASE_URL } from "../../config";
import { LinearGradient } from "expo-linear-gradient";

const CertificateScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;
        const response = await axios.get(
          `${BASE_URL}certificate/01j1bdmvf8wk0asczzbgx1c6yy`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "arraybuffer",
          }
        );
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setCertificate(base64Image);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      Alert.alert("Error", "Failed to fetch certificate.");
    } finally {
      setLoading(false);
    }
  };

  const requestFileWritePermission = async () => {
    // Android case: Request directory permissions for external storage
    if (Platform.OS === "android") {
      try {
        const permissions =
          await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
          Alert.alert(
            "Permission Denied",
            "File write permission is required to save the certificate."
          );
          return { access: false, directoryUri: null };
        }
        return { access: true, directoryUri: permissions.directoryUri };
      } catch (error) {
        console.error("Error requesting file write permission:", error);
        Alert.alert("Error", "An error occurred while requesting permissions.");
        return { access: false, directoryUri: null };
      }
    }
    // iOS case: Permission is not needed, so use document directory
    else {
      return { access: true, directoryUri: FileSystem.documentDirectory };
    }
  };

  const downloadCertificate = async (base64Image: string) => {
    try {
      const hasPermissions = await requestFileWritePermission();
      if (!hasPermissions.access) {
        return;
      }

      const directoryUri = hasPermissions.directoryUri || "";
      const fileName = `certificate_${Date.now()}.png`;

      // iOS: Use FileSystem.documentDirectory directly for file path
      const fileUri =
        Platform.OS === "android"
          ? await StorageAccessFramework.createFileAsync(
              directoryUri,
              fileName,
              "image/png"
            )
          : `${directoryUri}${fileName}`;

      // Write the file as base64
      await FileSystem.writeAsStringAsync(fileUri, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert("Success", `Certificate downloaded as ${fileName}`);
    } catch (error) {
      console.error("Error saving file:", error);
      Alert.alert("Error", "Failed to save certificate.");
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
    <View style={styles.container}>
      <View className='bg-[#064d7d]'>
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
            <Ionicons name='arrow-back' size={24} color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Certificate</Text>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        {certificate ? (
          <View style={styles.certificateContainer}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>
                You have successfully completed all modules and earned a
                certificate.
              </Text>
              <Text style={styles.messageText}>
                To download your certificate, please click the button below.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => downloadCertificate(certificate)}
              style={styles.downloadButton}
            >
              <Text style={styles.downloadButtonText}>
                Download Certificate
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noCertificateText}>
            No certificate earned yet.
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  certificateContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  congratsText: {
    fontSize: 28,
    color: "#064d7d",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  messageBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  downloadButton: {
    backgroundColor: "#064d7d",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  noCertificateText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

export default CertificateScreen;
