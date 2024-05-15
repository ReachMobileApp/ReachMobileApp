import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons/";
import { COLORS } from "@/src/theme/colors";
import { DropdownData } from "@/src/shared";

const _data: DropdownData[] = [
  { name: "Nigeria", id: "1" },
  { name: "Algeria", id: "2" },
  { name: "Canada", id: "3" },
];

const CustomDropdown = ({
  placeholder,
  data = _data, value, setValue
}: {
  placeholder?: string;
  data?: DropdownData[];
  value: string | null;
  setValue: (value: string) => void;
}) => {
  // const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
      placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
      selectedTextStyle={styles.placeholderStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      labelField="name"
      valueField="id"
      placeholder={placeholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.id);
        setIsFocus(false);
      }}
      renderRightIcon={(props) => (
        <Entypo
          name="chevron-thin-down"
          size={20}
          style={{ marginRight: 10 }}
        />
      )}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#666666",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 28,
    marginBottom: 20,
    backgroundColor:'#F7F7F7'
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
  },
});
