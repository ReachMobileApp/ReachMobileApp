import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from "react-native";
import React, { useContext } from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "@/src/theme/colors";

interface CustomPaperTextInputWithIconsProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  label?: string;
  outerStyle?: string;
  innerStyle?: string;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (e: any) => void;
  onFocus?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
}

const CustomPaperTextInputWithIcons: React.FC<
  CustomPaperTextInputWithIconsProps
> = ({
  leftComponent,
  rightComponent,
  label,
  outerStyle,
  innerStyle,
  inputStyle,
  containerStyle,
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
  onFocus,
  onBlur,
}) => {
  return (
    <View
      style={[styles.inputContainer, containerStyle]}
      className={outerStyle}
    >
      <TextInput
        mode="flat"
        style={[styles.input, inputStyle]}
        className={innerStyle}
        // textColor={isDarkMode ? COLORS.black : COLORS.black}
        label={label}
        activeUnderlineColor="black"
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray3}
        left={leftComponent}
        right={rightComponent}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomPaperTextInputWithIcons;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 4,
    height: 52,
    // height: 38,
    overflow: "hidden",
  },
  input: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 54,
    // height: 40,
    overflow: "hidden",
    // backgroundColor: '#fff',
  },
});
