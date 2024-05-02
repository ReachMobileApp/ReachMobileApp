import { Text } from "react-native";
import { TextFontType } from "./typography";

export const BodyText = ({
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
      textStyle = "font-[300] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[16px] leading-[20.8px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[16px] leading-[20.8px]";
      break;
  }

  return (
    <Text
      className={`${textStyle} flex-shrink my-[6px] text-black capitalize ${customClassName}`}
    >
      {text}
    </Text>
  );
};

export const BodyRegular = ({
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
      textStyle = "font-[300] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[14px] leading-[18.2px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[14px] leading-[18.2px]";
      break;
  }

  return (
    <Text
      className={`${textStyle} flex-shrink text-black capitalize ${customClassName}`}
    >
      {text}
    </Text>
  );
};

export const BodySmall = ({
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
      textStyle = "font-[300] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[12px] leading-[15.6px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[12px] leading-[15.6px]";
      break;
  }

  return (
    <Text
      className={`${textStyle} flex-shrink my-[6px] text-black capitalize ${customClassName}`}
    >
      {text}
    </Text>
  );
};
