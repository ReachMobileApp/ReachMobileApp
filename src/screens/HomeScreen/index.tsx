import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/src/components/Card";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Video from "@/assets/images/menuIcons/Video.png";
import Image2 from "@/assets/images/image2.png";
import UI from "@/assets/images/UI.png";
import sfuchas from "@/assets/images/sfuchas.png";
import UB from "@/assets/images/Uni Berm.png";
import Taleguru from "@/assets/images/Taleguru.png";
import APHRC from "@/assets/images/aphrc.png";
import KC from "@/assets/images/King's College.png";

// Initialize Firestore
const db = getFirestore();
const auth = getAuth();

const fetchModuleStatuses = async (userId: string) => {
    const colRef = collection(db, "users_data", userId, "modules");
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    const statuses: { [key: string]: string } = {}; // Add index signature to the statuses object

    querySnapshot.forEach((doc) => {
        statuses[doc.id] = doc.data().status || "not started";
    });

    return statuses;
};

const HomeScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    // Initialize state to hold the current date and module statuses
    const [currentDate, setCurrentDate] = useState(new Date());
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const fetchStatuses = async () => {
                const moduleStatuses = await fetchModuleStatuses(user.uid);
                setStatuses(moduleStatuses);
                setLoading(false);
            };
            fetchStatuses();
        }
    }, [user]);

    // Effect to update the current date when component mounts and every time the month changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); // Update every minute to capture changes in the date (e.g., at midnight)
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    // Function to get the date for a specific day
    const getDateForDay = (offset: number) => {
        const date = new Date();
        date.setDate(currentDate.getDate() + offset);
        return date;
    };

    // Function to get the module title
    const getModuleTitle = (moduleId: any) => {
        switch (moduleId) {
            case "introduction":
                return "Introduction";
            case "module1":
                return "Module 1";
            case "module2":
                return "Module 2";
            case "module3":
                return "Module 3";
            case "module4":
                return "Module 4";
            case "module5":
                return "Module 5";
            case "module6":
                return "Module 6";
            case "module7":
                return "Module 7";
            default:
                return "";
        }
    };
    const getModuleNavigator = (moduleId: any) => {
        switch (moduleId) {
            case "introduction":
                return "Introduction";
            case "module1":
                return "ModuleOne";
            case "module2":
                return "ModuleTwo";
            case "module3":
                return "ModuleThree";
            case "module4":
                return "ModuleFour";
            case "module5":
                return "ModuleFive";
            case "module6":
                return "ModuleSix";
            case "module7":
                return "ModuleSeven";
            default:
                return "";
        }
    };

    if (!user) {
        navigation.navigate("LoginScreen");
        return null;
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#064d7d" />
            </View>
        );
    }

    const handleModulePress = (moduleId: string) => {
        navigation.navigate("ModulesNavigator", {
            screen: getModuleNavigator(moduleId),
        });
    };

    const inProgressModules = Object.keys(statuses).filter(
        (moduleId) => statuses[moduleId] === "In progress"
    );

    return (
        <ScrollView className="flex-1 bg-white  ">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2 px-3">
                {/* Menu icon */}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SideMenuNavigator", {
                            screen: "MenuScreen",
                        })
                    }
                    className="p-2">
                    <Ionicons name="menu" size={24} color="#064D7D" />
                </TouchableOpacity>
                {/* Notification icon */}
                <TouchableOpacity
                    onPress={() => {
                        /* Add navigation logic for notifications */
                    }}
                    className="p-2">
                    <Ionicons name="notifications" size={24} color="#064D7D" />
                </TouchableOpacity>
            </View>

            {/* Date Selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-2 mx-1 bg-[#064D7D] mt-4 ">
                {[...Array(9)].map((_, index) => {
                    // Get the date for the current day
                    const date = getDateForDay(index);
                    const isCurrentDate =
                        date.toDateString() === currentDate.toDateString();
                    return (
                        <TouchableOpacity
                            key={index}
                            className={` p-2 ${
                                isCurrentDate
                                    ? "bg-[#064D7D] text-white"
                                    : "bg-transparent"
                            }`}
                            style={{ borderRadius: 5, marginRight: 5 }}>
                            <Text
                                className={`${
                                    isCurrentDate
                                        ? "text-white bg-[#b6cbd9] py-5 px-2  rounded-md"
                                        : "py-5 px-2 text-white"
                                }`}>
                                {isCurrentDate
                                    ? `${date.toLocaleString("default", {
                                          month: "short",
                                      })} ${date.getDate()}`
                                    : date.getDate()}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {/* Search Bar */}
                <View className="px-3 mb-2 mt-4 ">
                    <Text className="text-lg font-semibold mb-2">
                        Continue where you stopped
                    </Text>
                </View>

            {/* Main content */}
            <View className="bg-gray-200  pt-4">
                {/* Add your content here */}
                {/* Cards section */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="">
                    {/* Cards */}

                    {inProgressModules.map((moduleId) => (
                        <Card
                            key={moduleId}
                            image={Image2} // Replace with appropriate image for each module
                            header={getModuleTitle(moduleId)}
                            status={statuses[moduleId]}
                            duration="1 hr"
                            onPress={() => handleModulePress(moduleId)}

                        />
                    ))}
                </ScrollView>
            </View>
            <View className="bg-gray-200">
                <View className="px-3 py-1 bg-white shadow-lg">
                    <Text className="text-sm text-gray-500">
                        REaCh Training is designed to increase the use and
                        quality of remote consulting. Our definition of remote
                        consulting is when a person with a perceived health need
                        consults a healthcare provider using a mobile phone.
                        They will use the internet or telecommunications
                        infrastructure and will use SMART phones or feature
                        phones to communicate. Our LMIC definititon includes
                        consultation using non-mobile technology (e.g a computer
                        in a community center or a shared fixed telephone in a
                        remote rural village)
                    </Text>
                    <View className="flex justify-center items-center">
                        <TouchableOpacity className="text-center border-[#064D7D] bg-[#064D7D] rounded-2xl px-10 mt-3 py-2 border w-4/5">
                            <Text
                                onPress={() =>
                                    navigation.navigate("ModulesNavigator", {
                                        screen: "Introduction",
                                    })
                                }
                                className="text-white text-center  text-[16px]">
                                Continue Reading
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-2 mb-3 bg-white">
                    <View className="px-3 mb-4 mt-4 ">
                        <Text className="text-lg font-semibold mb-2">
                            Our Partners:
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row gap-3 px-2 items-center justify-center pb-4">
                            <View className=" justify-center flex items-center">
                                <Image source={UI} />
                                <Text style={{ fontSize: 8 }} className=" mt-2 text-center">
                                    University of Ibadan
                                </Text>
                            </View>
                            <View className="w-32 justify-center flex items-center">
                                <Image source={sfuchas} />
                                <Text style={{ fontSize: 8 }} className=" mt-2 text-center">
                                    Saint Frances University College of Health
                                    and Applied Sciences
                                </Text>
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={UB} />
                                <Text style={{ fontSize: 8 }} className=" mt-2 text-center">
                                    University of Birmingham
                                </Text>
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={Taleguru} />
                                <Text style={{ fontSize: 8 }} className=" mt-2">
                                    Makerere University
                                </Text>
                            </View>
                            <View className="w-32 justify-center flex items-center">
                                <Image source={APHRC} />
                                <Text style={{ fontSize: 8 }} className=" mt-2 text-center">
                                    African Population and Health Research
                                    Center
                                </Text>
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={KC} />
                                <Text style={{ fontSize: 8 }} className="text-center mt-2">
                                    King's College, London
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
