import React from "react";
import {
    View,
    Text,
    Image,
    ImageProps,
} from "react-native";

const Card = ({ header, image }: { header: string; image: ImageProps }) => {
    return (
        <View className=" mt-4 w-3/5 border-r  bg-white border-b shadow-md mx-1 px-1 py-3 flex flex-row ">
            <Image source={image} className="h-10 w-10" />
            <View className="flex justify-center ml-4 items-center">
                <Text className="text-xl text-[#064d7d]  font-bold ">{header}</Text>
            </View>
        </View>
    );
};

export default Card;
