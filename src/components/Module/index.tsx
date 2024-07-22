import React, { useState, useCallback } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { Video, ResizeMode } from 'expo-av';

const screenWidth = Dimensions.get("window").width;

const Module = ({
    header,
    subheader,
    videoUrl,
    onVideoFinish,
}: {
    header: string;
    subheader: string;
    videoUrl: string;
    onVideoFinish: () => void;
}) => {
    const [videoRef, setVideoRef] = useState<Video | null>(null);
    //@ts-ignore
    const onPlaybackStatusUpdate = useCallback((status) => {
        if (status.didJustFinish) {
            Alert.alert("Video has finished playing!");
            onVideoFinish();
        }
    }, [onVideoFinish]);

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
                    style={{ width: screenWidth - 32, height: 200 }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
            </View>
        </View>
    );
};

export default Module;
