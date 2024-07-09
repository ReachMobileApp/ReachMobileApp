import React, { useState, useCallback } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { Video, ResizeMode } from 'expo-av';

const screenWidth = Dimensions.get("window").width;

const Module = ({
    header,
    subheader,
    videoUrl,
    learningOutcome,
    learningOutcomeHeader,
}: {
    header: string;
    subheader: string;
    videoUrl: string;
    learningOutcome: string;
    learningOutcomeHeader?: string;
}) => {
    const [videoRef, setVideoRef] = useState<Video | null>(null);

    const onPlaybackStatusUpdate = useCallback((status) => {
        if (status.didJustFinish) {
            Alert.alert("Video has finished playing!");
        }
    }, []);

    return (
        <View className="p-4">
            <Text className="text-2xl text-[#064d7d] font-bold ">{header}</Text>
            <Text className="text-sm text-gray-500 mb-1 ">{subheader}</Text>
            <View className="w-full h-52 px-2">
                <Video
                    ref={(ref) => setVideoRef(ref)}
                    source={{ uri: videoUrl }} // Use videoUrl prop here
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
            </View>
            <View>
                <Text className="mb-3 text-[#183745] font-bold text-lg">{learningOutcomeHeader}</Text>
                <Text className="mb-2 text-[#183745] text-base">{learningOutcome}</Text>
            </View>
        </View>
    );
};

export default Module;
