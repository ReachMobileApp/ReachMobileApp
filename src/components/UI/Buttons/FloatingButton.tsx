import { TouchableOpacity } from "react-native";
import React from "react";
import { BodyText } from "@/src/theme/typography/BodyText";
import { TextFontType } from "@/src/theme/typography/typography";
import { COLORS } from "@/src/theme/colors";
import { AntDesign } from "@expo/vector-icons";

const FloatingButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-10 right-4 bg-primary-500 flex-row items-center rounded-full px-3 py-2"
    >
      <AntDesign name="plus" color={COLORS.white} size={20} />
      <BodyText
        text={title}
        type={TextFontType.Medium}
        customClassName="text-white ml-2"
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
