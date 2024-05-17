import React from "react";
import { View, Text, Image, TouchableOpacity, ImageProps } from "react-native";

const Card = ({
    image,
    header,
    duration,
    status,
    onPress,
}: {
    image: ImageProps;
    header: string;
    duration: string;
    status: string;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
           >
            <View className="mb-4 w-40 mx-2 rounded-md shadow-2xl">
                <Image
                    source={image}
                    className="w-full h-30 mb-1 rounded-t-lg"
                />
                <View className="rounded-b-lg bg-white  px-2">
                    <Text className="text-sm text-[#064d7d] mb-1">
                        {header}
                    </Text>
                    {/* <Text className="text-xs text-gray-600 mb-1">{subheader}</Text> */}
                    <View className="flex-row justify-between mb-1">
                        <Text className="mr-2 text-green-500">{duration}</Text>
                        <Text className="ml-2 text-red-500">{status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Card;
