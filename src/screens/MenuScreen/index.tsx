import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/src/config";

// Import images
import Course from "@/assets/images/menuIcons/Course.png";
import Logout from "@/assets/images/menuIcons/Logout.png";
import TrackProgress from "@/assets/images/menuIcons/TrackProgress.png";
import Certificate from "@/assets/images/menuIcons/support_agent.png";
import ArrowRight from "@/assets/images/menuIcons/arrowRight.png";
import { showMessage } from "react-native-flash-message";
import { COLORS } from "@/src/theme/colors";

const MenuScreen = ({ navigation }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SignOut = async () => {
    setLoading(true);
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.data.auth_token;
        const response = await axios.post(
          `${BASE_URL}logout`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          await AsyncStorage.multiRemove(["userInfo", "email"]);
          //   Toast.show({
          //     type: "success",
          //     text1: "Success!",
          //     text2: "Logged out successfully",
          //   });
          showMessage({
            message: "Logged out successfully",
            type: "success",
            icon: "success",
            backgroundColor: COLORS.success[600],
            statusBarHeight: 50,
          });
          navigation.navigate("SignInScreen");
        } else {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
      //   Toast.show({
      //     type: "error",
      //     text1: "Error!",
      //     text2: "Failed to log out",
      //   });
      showMessage({
        message: "Failed to log out",
        type: "danger",
        icon: "danger",
        backgroundColor: COLORS.danger[600],
        statusBarHeight: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setUser(parsedData.data.user.name);
      }
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  interface MenuItemProps {
    icon: any;
    title: string;
    onPress: () => void;
  }

  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Image source={icon} className='mr-4' />
      <Text style={styles.menuText}>{title}</Text>
      <Image source={ArrowRight} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#064D7D' />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hello, {user || "User"}</Text>

      <View style={styles.menuContainer}>
        <MenuItem
          icon={Course}
          title='Courses'
          onPress={() =>
            navigation.navigate("BottomTabNavigator", { screen: "Modules" })
          }
        />
        <MenuItem
          icon={TrackProgress}
          title='Badges'
          onPress={() =>
            navigation.navigate("SideMenuNavigator", { screen: "Badge" })
          }
        />
        <MenuItem
          icon={Certificate}
          title='Certificate'
          onPress={() =>
            navigation.navigate("SideMenuNavigator", { screen: "Certificate" })
          }
        />
        <MenuItem icon={Logout} title='Logout' onPress={SignOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#064D7D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backButton: {
    padding: 8,
  },
  greeting: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuIcon: {
    width: 12,
    height: 12,
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});

export default MenuScreen;
