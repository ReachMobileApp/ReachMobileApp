import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput, Button,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
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
import UW from "@/assets/images/warwick.png";
import UKRI from "@/assets/images/UKRI.png";
import NF from "@/assets/images/NewtonFund.png";
import GCRF from "@/assets/images/GCRF.png";
import KC from "@/assets/images/King's College.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Initialize Firestore
const db = getFirestore();
const auth = getAuth();

interface Course {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

interface ApiResponse {

    data: {
        data: {
            data: Course[];
        };
    };
}


const HomeScreen = ({ navigation, }: { navigation: DrawerNavigationProp<any, any>; }) => {
    // Initialize state to hold the current date and module statuses
    const [currentDate, setCurrentDate] = useState(new Date());
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    //const user = auth.currentUser;

    // useEffect(() => {
    //     if (user) {
    //         const fetchStatuses = async () => {
    //             const moduleStatuses = await fetchModuleStatuses(user.uid);
    //             setStatuses(moduleStatuses);
    //             setLoading(false);
    //         };
    //         fetchStatuses();
    //     }
    // }, [user]);

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

 

    const handleModulePress = (moduleId: string) => {
        navigation.navigate("ModulesNavigator", {
            screen: getModuleNavigator(moduleId),
        });
    };

    const inProgressModules = Object.keys(statuses).filter(
        (moduleId) => statuses[moduleId] === "In progress"
    );

    const fetchCourses = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                const response = await axios.get<ApiResponse>('https://reachweb.brief.i.ng/api/v1/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

               // console.log(response.data.data.data.data);
                setCourses(response.data.data.data.data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
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
                            className={` p-2 ${isCurrentDate
                                ? "bg-[#064D7D] text-white"
                                : "bg-transparent"
                                }`}
                            style={{ borderRadius: 5, marginRight: 5 }}>
                            <Text
                                className={`${isCurrentDate
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
                    Start Courses
                </Text>
            </View>

            {/* Main content */}
            <View className="bg-gray-200  pt-4">
                {/* Add your content here */}
                {/* Cards section */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="p-4 w-80">
                    {/* Cards */}
                    {courses.map((course) => (
                        <View key={course.id}
                            style={{
                                marginBottom: 10,
                                width: 250,
                                marginHorizontal: 5,
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                                backgroundColor: "white",
                                paddingBottom: 10
                            }}>
                            <Image
                                source={{ uri: course.image_url }}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                            />
                            <View className="rounded-b-lg bg-white  items-center ">
                                <Text className="text-xl text-[#064d7d] mb-1">
                                    {course.name}
                                </Text>
                            </View>
                            <View className="flex justify-center items-center">
                                <TouchableOpacity className="text-center border-[#064D7D] bg-[#064D7D] rounded-2xl px-10 mt-3 py-2 border w-4/5 flex flex-row gap-x-3" onPress={() => navigation.navigate('BottomTabNavigator', { screen: 'Module' })}>
                                    <Text className="text-sm text-white pt-1">Go to Modules</Text>
                                    <AntDesign name="arrowright" size={24} color="white" className="" />
                                </TouchableOpacity>
                            </View>
                        </View>
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
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('BottomTabNavigator',{ screen: 'Module' })}
                         className="text-center border-[#064D7D] bg-[#064D7D] rounded-2xl px-10 mt-3 py-2 border w-4/5">
                            <Text
                                onPress={() =>
                                    navigation.navigate("BottomTabNavigator", {
                                        screen: "ModuleScreen",
                                    })
                                }
                                className="text-white text-center  text-[16px]">
                                GET STARTED 
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
                        <View className="flex flex-row gap-5 px-2 items-center justify-center pb-4">
                            <View className=" justify-center flex items-center">
                                <Image source={KC} style={{ height: 100, width: 100 }} />
                              
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={UI} style={{ height: 100, width: 100 }}  />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={UW} style={{ height: 100, width: 100 }}  />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={sfuchas} style={{ height: 100, width: 100 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={UB} style={{ height: 100, width: 100 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={Taleguru} style={{ height: 150, width: 100 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={APHRC} style={{ height: 100, width: 300 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={UKRI} style={{ height: 100, width: 300 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={NF} style={{ height: 100, width: 300 }} />
                               
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image source={GCRF} style={{ height: 100, width: 300 }} />
                               
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
