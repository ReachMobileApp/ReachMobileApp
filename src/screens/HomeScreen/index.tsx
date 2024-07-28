import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import UI from "@/assets/images/UI.jpg";
import sfuchas from "@/assets/images/sfuchas.jpg";
import UB from "@/assets/images/UniBerm.jpg";
import Taleguru from "@/assets/images/Taleguru.jpg";
import APHRC from "@/assets/images/aphrc.jpg";
import UW from "@/assets/images/warwick.jpg";
import UKRI from "@/assets/images/UKRI.jpg";
import NF from "@/assets/images/NewtonFund.jpg";
import GCRF from "@/assets/images/GCRF.jpg";
import KC from "@/assets/images/KingsCollege.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/src/config";

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

const HomeScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); // Update every minute to capture changes in the date (e.g., at midnight)
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const getDateForDay = (offset: number) => {
        const date = new Date();
        date.setDate(currentDate.getDate() + offset);
        return date;
    };

    const scrollViewRef = useRef<ScrollView>(null);
    const screenWidth = Dimensions.get("window").width;
    let scrollPosition = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollViewRef.current) {
                scrollPosition += screenWidth / 3; // Adjust the scroll step size as needed
                scrollViewRef.current.scrollTo({
                    x: scrollPosition,
                    animated: true,
                });
            }
        }, 3000); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [screenWidth]);

    const handleScroll = ({ nativeEvent }: any) => {
        const maxScroll =
            nativeEvent.contentSize.width - nativeEvent.layoutMeasurement.width;
        if (nativeEvent.contentOffset.x >= maxScroll) {
            scrollPosition = 0; // Reset to the start
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    x: scrollPosition,
                    animated: false,
                });
            }
        }
    };

    const fetchCourses = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                const response = await axios.get<ApiResponse>(
                    `${BASE_URL}courses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourses(response.data.data.data.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToModules = async (courseId: string) => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.data.auth_token;

                await axios.patch(
                    `${BASE_URL}courses/01j1bdmvf8wk0asczzbgx1c6yy`,
                    {
                        /* your patch data */
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                navigation.navigate("BottomTabNavigator", {
                    screen: "Modules",
                });
            }
        } catch (error) {
            console.error("Error sending patch request:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <ScrollView className="flex-1 bg-white  ">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2 px-3">
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SideMenuNavigator", {
                            screen: "MenuScreen",
                        })
                    }
                    className="p-2">
                    <Ionicons name="menu" size={24} color="#064D7D" />
                </TouchableOpacity>
            </View>

            {/* Date Selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-2 mx-1 bg-[#064D7D] mt-4 ">
                {[...Array(9)].map((_, index) => {
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
                    Start Course(s)
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
                    {courses.map((course) => (
                        <View
                            key={course.id}
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
                                paddingBottom: 10,
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
                                {/* Modules */}
                                <TouchableOpacity
                                    onPress={() => handleGoToModules(course.id)}
                                    className="text-center border-[#064D7D] bg-[#064D7D] rounded-2xl px-10 mt-3 py-2 border w-4/5 flex flex-row gap-x-3">
                                    <Text className="text-sm text-white pt-1">
                                        Get Started
                                    </Text>
                                    <AntDesign
                                        name="arrowright"
                                        size={24}
                                        color="white"
                                        className=""
                                    />
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
                   
                </View>

                <View className="mt-2 mb-3 bg-white">
                    <View className="px-3 mb-4 mt-4 ">
                        <Text className="text-lg font-semibold mb-2">
                            Our Partners:
                        </Text>
                    </View>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        // scrollEventThrottle={2} // This controls how often the onScroll callback is fired
                    >
                        <View className="flex flex-row gap-5 px-2 items-center justify-center pb-4">
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={KC}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={UI}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={UW}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={sfuchas}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={UB}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={Taleguru}
                                    style={{ height: 100, width: 50 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={APHRC}
                                    style={{ height: 50, width: 150 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={UKRI}
                                    style={{ height: 50, width: 150 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={NF}
                                    style={{ height: 50, width: 150 }}
                                />
                            </View>
                            <View className=" justify-center flex items-center">
                                <Image
                                    source={GCRF}
                                    style={{ height: 50, width: 150 }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
