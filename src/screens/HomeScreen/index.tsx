import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/src/components/Card";
import Image1 from "@/assets/images/image1.png";
import Image2 from "@/assets/images/image2.png";

const HomeScreen = ({
    navigation,
}: {
    navigation: DrawerNavigationProp<any, any>;
}) => {
    // Initialize state to hold the current date
    const [currentDate, setCurrentDate] = useState(new Date());

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

    

    return (
        <ScrollView className="flex-1 bg-white  ">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2 px-3">
                {/* Menu icon */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('SideMenuNavigator',{ screen: 'MenuScreen' })}
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
            <View className="flex-row items-center my-4 mx-3">
                {/* Search input */}
                <TextInput
                    placeholder="Search"
                    className="flex-1 border border-[#064d7d] rounded-lg py-2 px-4"
                />
                {/* Filter button */}
                <TouchableOpacity className="ml-2 bg-[#064d7d] rounded-lg py-2 px-4">
                    <Text className="text-white">Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Main content */}
            <View className="bg-gray-200 ">
                <View className="px-3 mb-4 mt-4 ">
                    <Text className="text-lg font-semibold mb-2">
                        Continue where you stopped
                    </Text>
                </View>
                {/* Add your content here */}
                {/* Cards section */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="">
                    {/* Cards */}

                    <Card
                        image={Image1}
                        header="Course 1 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
                    <Card
                        image={Image2}
                        header="Course 2 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
                    <Card
                        image={Image1}
                        header="Course 3 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
                    <Card
                        image={Image2}
                        header="Course 4 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
                    <Card
                        image={Image1}
                        header="Course 5 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
                    <Card
                        image={Image2}
                        header="Course 6 of 6"
                        subheader="How to cure pneumonia in a toddler child"
                        rating="★ 4.0/5.0"
                        completionPercentage={80}
                    />
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
                   {/* <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="gap-2">
                   <View className="w-1/6 justify-center">
                            <Image source={UI} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                        <View className="w-1/6 justify-center">
                            <Image source={sfuchas} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                        <View className="w-1/6 justify-center">
                            <Image source={UB} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                        <View className="w-1/6 justify-center">
                            <Image source={Taleguru} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                        <View className="w-1/6 justify-center">
                            <Image source={APHRC} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                        <View className="w-1/6 justify-center flex ">
                            <Image source={KC} />
                            <Text className="text-xs">University of Ibadan</Text>
                        </View>
                    </ScrollView> */}
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
