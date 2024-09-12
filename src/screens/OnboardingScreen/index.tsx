import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import React, { useLayoutEffect } from "react";
import { COLORS } from "@/src/theme/colors";
import { IconButton } from "react-native-paper";
import Image1 from "@/assets/images/layer1.png";
import Image2 from "@/assets/images/Layer2.png";
import Image3 from "@/assets/images/layer3.png";
import { CustomButton } from "@/src/components/UI/Buttons";
import { StackNavigationProps } from "@/src/shared";
import { useRef } from "react";

const OnboardingScreen = ({ navigation }: StackNavigationProps) => {
  const swiperRef = useRef<Swiper>(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => navigation.navigate("SignInScreen")}
          className="mr-10 text-xl font-bold text-[#064D7D]"
        >
          {"Skip >>"}
        </Text>
      ),
    });
  }, [navigation]);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View className="flex-1 pt-10 bg-white h-full">
      <View></View>
      <Swiper
        ref={swiperRef}
        dot={
          <View
            style={{
              backgroundColor: "gray",
              width: "11%",
              height: "2%",
              borderRadius: 7,
              marginLeft: "3%",
              marginRight: "3%",
              marginTop: "25%",
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#064D7D",
              width: "11%",
              height: "2%",
              borderRadius: 7,
              marginLeft: "3%",
              marginRight: "3%",
              marginTop: "25%",
            }}
          />
        }
        paginationStyle={{
          top: "10%",
        }}
        loop={false}
      >
        <View className="flex-1 pt-2 relative h-full w-full">
          <Image
            source={Image1}
            resizeMode="cover"
            className="mx-[12%]  z-10 w-[63%] h-[40%]"
          />
          <View className="mx-[5%] mt-[0%] bg-[#2061C7]  flex justify-center border border-red-800 py-3 items-center">
            <Text className="text-[13px] text-center pt-1 text-white px-2">
              Determining trustworthiness and safety of remote {"\n"} consulting
              in primary healthcare for chronic disease {"\n"} populations in
              Africa
            </Text>
          </View>
          <TouchableOpacity onPress={handleNextSlide}>
            <View className="mt-[50%] mr-3 flex items-end justify-center">
              <View className="w-14 bg-[#2061C7]  rounded-full">
                <IconButton iconColor="white" icon="arrow-right-thin" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="pt-2 relative h-full w-full">
          <Image
            source={Image3}
            resizeMode="cover"
            className="mx-[20%]  z-10 w-[63%] h-[40%]"
          />

          <View className="mx-[5%] mt-[0%] bg-[#2061C7] flex justify-center border border-red-800 py-3  items-center">
            <Text className="text-[13px] text-center  text-white px-2">
              Determining trustworthiness and safety of remote {"\n"} consulting
              in primary healthcare for chronic disease {"\n"} populations in
              Africa
            </Text>
          </View>
          <TouchableOpacity onPress={handleNextSlide}>
            <View className="mt-[50%] mr-3 flex items-end justify-center">
              <View className="w-14 bg-[#2061C7]  rounded-full">
                <IconButton iconColor="white" icon="arrow-right-thin" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1 pt-5 w-full h-full">
          <View className="mx-9 flex justify-center items-center">
            <Text className="text text-center  text-black px-2">
              Determining trustworthiness and safety of {"\n"} remote consulting
              in primary healthcare for {"\n"} chronic disease populations in
              Africa
            </Text>
          </View>
          <Image
            source={Image2}
            resizeMode="cover"
            className="mx-[20%] mt-3 w-[60%] h-[35%]"
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <View className="mt-[50%] h-12 bg-[#2061C7] w-[70%] mx-14 rounded-[50px] flex items-center justify-center">
              <Text className="text-center text-base text-white">
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

export default OnboardingScreen;
