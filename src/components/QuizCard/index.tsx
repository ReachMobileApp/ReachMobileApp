import React from "react";
import { View, Text } from "react-native";

const Card = ({
    attempt,
    time,
}: {
    attempt: number;
    time: string;
}) => {
    return (
        <View className="bg-white border border-[#707070] flex justify-center items-center text-center py-8 shadow-inner">
            <Text className="text-xl text-[#064d7d] font-bold mb-4">Attempts Allowed: {attempt}</Text>
            <Text className="text-xl text-[#064d7d] font-bold mb-4 ">
             Time Limit: {time}
            </Text>
            <Text className="text-xl text-[#064d7d] font-bold ">Grading Method: Highest Grade</Text>
        </View>
    );
};

export default Card;
