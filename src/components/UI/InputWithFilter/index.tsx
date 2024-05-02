import { TouchableOpacity, View } from "react-native";
import React from "react";
import CustomPaperTextInputWithIcons from "../Inputs/CustomPaperTextInputWithIcons";
import { TextInput } from "react-native-paper";
import { COLORS } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface ModalProp {
  setVisible: (value: boolean) => void;
}

const InputWithFilter = ({
  filterModalRef,
}: {
  filterModalRef: React.RefObject<ModalProp>;
}) => {
  return (
    <View className="my-5 flex-row items-center">
      <CustomPaperTextInputWithIcons
        outerStyle="bg-white border border-borderColor flex-[.9]"
        innerStyle="bg-white text-sm"
        inputStyle={{ height: 50 }}
        containerStyle={{ height: 48 }}
        rightComponent={
          <TextInput.Icon
            icon={() => (
              <Ionicons name="search-outline" color={COLORS.black} size={22} />
            )}
          />
        }
        placeholder="Search for student"
      />
      <TouchableOpacity
        onPress={() => filterModalRef.current?.setVisible(true)}
        className="flex-[.1] ml-3 border border-borderColor self-stretch px-2 items-center justify-center rounded-md"
      >
        <Ionicons name="filter-outline" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default InputWithFilter;
