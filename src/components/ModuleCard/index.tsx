import React from "react";
import { View, Text, Image, ImageProps } from "react-native";
import Video from "@/assets/images/menuIcons/Video.png";

const Card = ({
    header,
    subheader,
    duration,
    status,
}: {
    header: string;
    subheader: string;
    duration: string;
    status?: string;
}) => {
    return (
        <View className="mb-4 mt-4 w-full bg-white border-b-2 mx-1 px-1 py-3 flex flex-row ">
            <Image source={Video} className="h-20 w-28" />
            <View className="flex w-8/12  px-3">
                <Text className="text-xl text-black  font-bold ">{header}</Text>
                <Text className="text-sm text-gray-600 ">{subheader}</Text>

                    <Text className="text-sm text-green-400 ">{duration}</Text>
                    <Text className="text-sm text-red-600">{status}</Text>
            </View>
        </View>
    );
};

export default Card;
