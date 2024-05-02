import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Dimensions,
    Linking,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const screenWidth = Dimensions.get("window").width;

const ModuleComponent = ({
    header,
    subheader,
    videoId,
    duration,
    learningOutcome,
    learningOutcomeHeader,
}: {
    header: string;
    subheader: string;
    videoId: string;
    duration: string;
    learningOutcome: string;
    learningOutcomeHeader?: string;
}) => {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View className="p-4">
            <Text className="text-2xl text-[#064d7d] font-bold ">{header}</Text>
            <Text className="text-sm text-gray-500 mb-1 ">{subheader}</Text>
            <Text className="text-sm text-red-500 mb-2">{duration}</Text>
            <View className="w-full h-52 px-2">
                <YoutubePlayer
                    height={250}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                />
            </View>
            <View>
                <Text className="mb-3 text-[#183745] font-bold text-lg">{learningOutcomeHeader}</Text>
                <Text className="mb-2 text-[#183745] text-base">{learningOutcome}</Text>
            </View>
        </View>
    );
};

export default ModuleComponent;
