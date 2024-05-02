import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/src/theme/colors";
import { Feather } from "@expo/vector-icons";

export const CustomButton = ({
  title,
  disabled,
  outline,
  onPress,
  customClassName,
}: {
  title: string;
  outline?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  customClassName?: string;
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <LinearGradient
        colors={
          outline
            ? [COLORS.transparent, COLORS.transparent]
            : [COLORS.primary[500], COLORS.primary[450]]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`px-7 py-4 items-center mb-4 rounded-md border border-transparent ${
          outline && "border-primary-500"
        } ${customClassName}`}
      >
        <Text
          className={`text-white font-medium ${outline && "text-primary-500"}`}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
