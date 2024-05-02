import React from "react";
import {
    View,
    Text,
    Image,
    ProgressBarAndroid,
    ImageProps,
} from "react-native";
import Video from "@/assets/images/menuIcons/Video.png";

const Card = ({
    header,
    subheader,
    duration,
    completionPercentage,
}: {
    header: string;
    subheader: string;
    duration: string;
    completionPercentage: number;
}) => {
    return (
        <View className="mb-4 mt-4 w-full bg-white border-b-2 mx-1 px-1 py-3 flex flex-row ">
            <Image source={Video} className="h-20 w-28" />
            <View className="flex w-8/12  px-3">
                <Text className="text-xl text-black  font-bold ">{header}</Text>
                <Text className="text-sm text-gray-600 ">{subheader}</Text>

                <View className="flex flex-row">
                <ProgressBarAndroid
                    style={{ flex: 1 }}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={completionPercentage / 100}
                /><Text className="ml-2 text-sm text-red-600">{`${completionPercentage}%`}</Text>
                </View>
                <Text className="text-sm text-red-600">{duration}</Text>
            </View>
        </View>
    );
};

export default Card;
