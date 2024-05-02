import { Text } from "react-native";
import React from "react";
import { TextFontType } from "./typography";

export const H1Text = ({
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
      textStyle = "font-[300] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[92px] leading-[101.2px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[92px] leading-[101.2px]";
      break;

    default:
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

export const H2Text = ({
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
      textStyle = "font-[300] text-[60px] leading-[66px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[60px] leading-[66px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[60px] leading-[66px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[60px] leading-[66px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[60px] leading-[66px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[60px] leading-[66px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[60px] leading-[66px]";
      break;

    default:
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

export const H3Text = ({
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
      textStyle = "font-[300] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[48px] leading-[52.8px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[48px] leading-[52.8px]";
      break;

    default:
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

export const H4Text = ({
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
      textStyle = "font-[300] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[36px] leading-[43.63px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[36px] leading-[43.63px]";
      break;

    default:
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

export const H5Text = ({
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
      textStyle = "font-[300] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[24px] leading-[29.09px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[24px] leading-[29.09px]";
      break;

    default:
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

export const H6Text = ({
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
      textStyle = "font-[300] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Regular:
      textStyle = "font-[400] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Medium:
      textStyle = "font-[500] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Semibold:
      textStyle = "font-[600] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Bold:
      textStyle = "font-[700] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Extrabold:
      textStyle = "font-[800] text-[20px] leading-[24.24px]";
      break;
    case TextFontType.Black:
      textStyle = "font-[900] text-[20px] leading-[24.24px]";
      break;

    default:
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
