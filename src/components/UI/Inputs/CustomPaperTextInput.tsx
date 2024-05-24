import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ImageSourcePropType,
  StatusBar,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import { TextInput } from "react-native-paper";
import { COLORS } from "@/src/theme/colors";
const CustomPaperTextInput = ({
  label,
  error,
  onChangeText,
  value,
  onBlur,
  keyboardType,
  isDarkMode,
}: {
  label: string;
  error?: boolean;
  value?: string;
  onChangeText?: (((text: string) => void) & Function) | undefined;
  isDarkMode?: boolean;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to determine the icon based on the label
  const getIcon = () => {
    if (label === "Password" || label === "Confirm Password") {
      return (
        <TextInput.Icon
        size={20}
          icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword((show) => !show)}
        />
      );
    } else if (label === "Email Address") {
    return <TextInput.Icon icon="email" size={15} />;
    }else if (label === "Full Name") {
      return <TextInput.Icon icon="account" size={20} />;
      }
      else if (label === "Username") {
        return <TextInput.Icon icon="camera-account" size={20} />;
        }
        else if (label === "City/Town") {
          return <TextInput.Icon icon="account-cowboy-hat" size={20} />;
          }else if (label === "Occupation") {
            return <TextInput.Icon icon="tools" size={20} />;
            }else if (label === " ") {
              return <TextInput.Icon icon="email" size={20} />;
              }
     else {
      return null;
    }
  };

  return (
    <TextInput
      className={`bg-[#F7F7F7] text-[18px] border-[#666666] rounded-[20px] mb-4`}
      label={label}
      keyboardType={keyboardType || "default"}
      underlineColor="transparent"
      activeUnderlineColor={"#000"}
      secureTextEntry={
        (label === "Password" && !showPassword) ||
        (label === "Confirm Password" && !showPassword)
      }
      textColor={isDarkMode ? COLORS.white : COLORS.textColor}
      value={value}
      error={error}
      onChangeText={onChangeText}
      left={getIcon()} // Render the icon based on the label
    />
  );
};

export default CustomPaperTextInput;

