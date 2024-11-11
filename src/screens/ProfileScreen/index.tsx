import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/images/image.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./../../config";
import Card from "@/src/components/BadgeCard";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Modal, Portal } from "react-native-paper";

type ApiResponse2 = {
  success: boolean;
  status: string;
  message: string;
  data: Array<{
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    facility_id: string;
    profile: {
      id: number;
      username: string;
      occupation: string;
      city: string;
      country: string;
      facility_id: string | null;
      user_id: string;
      created_at: string;
      updated_at: string;
    };
  }>;
};

type Module = {
  id: string;
  name: string;
  has_completed_quiz: boolean;
};

const DELETION_URL = "https://uhfiles.ui.edu.ng/account-deletion";

const ProfileScreen = ({ navigation }: any) => {
  const [selectedSection, setSelectedSection] = useState("aboutMe");
  const [userDetails, setUserDetails] = useState<any>([]);
  const [userDetail, setUserDetail] = useState<any>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);

  const confirmAccountDeletion = () => {
    setModalVisible(true);
  };

  const handleDeleteAccount = () => {
    setModalVisible(false);
    Linking.openURL(DELETION_URL);
  };

  const fetchProfile = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;

        const response = await axios.get<ApiResponse2>(
          `${BASE_URL}user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;
        setUserDetail(parsedUserInfo.data.user);

        const response = await axios.get<{ data: Module[] }>(
          `${BASE_URL}courses/01j1bdmvf8wk0asczzbgx1c6yy/modules`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setModules(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchModules();
      fetchProfile();
    }, [])
  );

  const handleSwitchChange = (value: boolean) => {
    setSelectedSection(value ? "aboutMe" : "badges");
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
        <View style={styles.profileInfo}>
          <Image source={Avatar} style={styles.avatar} />
          <Text style={styles.name}>{userDetails?.name}</Text>
          <Text style={styles.email}>{userDetails?.email}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              selectedSection === "aboutMe" && styles.switchButtonActive,
            ]}
            onPress={() => handleSwitchChange(true)}
          >
            <Text
              style={[
                styles.switchButtonText,
                selectedSection === "aboutMe" && styles.switchButtonTextActive,
              ]}
            >
              About Me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              selectedSection === "badges" && styles.switchButtonActive,
            ]}
            onPress={() => handleSwitchChange(false)}
          >
            <Text
              style={[
                styles.switchButtonText,
                selectedSection === "badges" && styles.switchButtonTextActive,
              ]}
            >
              Badges
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView style={styles.content}>
        {selectedSection === "aboutMe" ? (
          <View style={styles.aboutMeContainer}>
            {[
              { label: "Name", value: userDetails?.name },
              { label: "Occupation", value: userDetails?.occupation },
              { label: "Email", value: userDetails?.email },
              { label: "Gender", value: userDetails?.gender },
              { label: "Years of Work", value: userDetails?.years_of_work },
            ].map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{item.label}:</Text>
                <Text style={styles.infoValue}>{item.value || "N/A"}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.badgesContainer}>
            {modules.length > 0 ? (
              modules
                .filter((module) => module.has_completed_quiz)
                .map((module) => (
                  <Card
                    key={module.id}
                    header={module.name}
                    subheader='Completed'
                  />
                ))
            ) : (
              <Text style={styles.noBadgesText}>No badges earned yet.</Text>
            )}
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          mode='contained'
          onPress={confirmAccountDeletion}
          style={styles.deleteButton}
        >
          Delete Account
        </Button>
      </View>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.modalActions}>
              <Button onPress={() => setModalVisible(false)}>Cancel</Button>
              <Button onPress={handleDeleteAccount}>Yes, Delete</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
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
  header: {
    backgroundColor: "#064D7D",
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  switchButtonActive: {
    backgroundColor: "#81b0ff",
  },
  switchButtonText: {
    fontWeight: "bold",
    color: "#3e3e3e",
  },
  switchButtonTextActive: {
    color: "white",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  aboutMeContainer: {
    backgroundColor: "white",
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#064D7D",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  badgesContainer: {
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noBadgesText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },

  footer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
export default ProfileScreen;
