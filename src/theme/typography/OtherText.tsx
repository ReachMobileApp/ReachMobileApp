import { Text, View } from "react-native";
import { TextFontType } from "./typography";

export const DescriptionText = ({
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
      textStyle = "font-[300] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[10px] leading-[12.12px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[10px] leading-[12.12px]";
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
export const Overline1Text = ({
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
      textStyle = "font-[300] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[12px] leading-[14.54px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[12px] leading-[14.54px]";
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

export const Overline2Text = ({
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
      textStyle = "font-[300] text-[11px] leading-[11px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[11px] leading-[11px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[11px] leading-[11px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[11px] leading-[11px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[11px] leading-[11px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[11px] leading-[11px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[11px] leading-[11px]";
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

export const UnVerifiedKycText = () => {
  return (
    <View className="rounded-full bg-accent-20 p-1">
      <DescriptionText
        text="KYC UNVERIFIED"
        type={TextFontType.Medium}
        customClassName="p-0 m-0 text-accent-100 text-center normal-case"
      />
    </View>
  );
};
