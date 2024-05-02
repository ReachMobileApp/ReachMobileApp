import { Text } from "react-native";
import { TextFontType } from "./typography";

export const Sub1Text = ({
  text,
  type,
  customClassName,
}: {
  text: string;
  type: TextFontType;
  customClassName?: string;
}) => {
  let textStyle = "";

  switch (type) {
    case TextFontType.Light:
      textStyle = "font-[300] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[18px] leading-[23.4px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[18px] leading-[23.4px]";
      break;
  }

  return (
    <Text
      className={`${textStyle} flex-shrink my-[5px] text-black capitalize ${customClassName}`}
    >
      {text}
    </Text>
  );
};

export const Sub2Text = ({
  text,
  type,
  customClassName,
}: {
  text: string;
  type: TextFontType;
  customClassName?: string;
}) => {
  let textStyle = "";

  switch (type) {
    case TextFontType.Light:
      textStyle = "font-[300] text-[16px] leading-[24px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[16px] leading-[24px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[16px] leading-[24px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[16px] leading-[24px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[16px] leading-[24px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[16px] leading-[24px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[16px] leading-[24px]";
      break;
  }

  return (
    <Text
      className={`${textStyle} flex-shrink my-[5px] text-black capitalize ${customClassName}`}
    >
      {text}
    </Text>
  );
};
