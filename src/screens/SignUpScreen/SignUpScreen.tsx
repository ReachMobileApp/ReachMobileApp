import { View, Text, ScrollView, StatusBar, TouchableOpacity , Image} from "react-native";
import React from "react";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import CustomDropdown from "@/src/components/UI/Dropdown";
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import face from "@/assets/images/face.png";
import github from "@/assets/images/github.png";
import google from "@/assets/images/google.png";
const SignUpScreen = ({ navigation }: StackNavigationProps) => {
  return (
    <>
    <ScrollView className="flex-1 bg-white px-4 pt-5">
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle={"dark-content"}
        animated
      />
      <View>
        
        <CustomPaperTextInput label="Full Name" />
        <CustomPaperTextInput label="Email Address" />
        <CustomPaperTextInput label="Username" />
        <CustomPaperTextInput label="Password" />
        <CustomPaperTextInput label="City/Town" />
        <CustomDropdown placeholder="Country" />
        <CustomPaperTextInput label="Occupation" />
       
      </View>
        <View className="flex justify-center items-center">
            <View className="flex flex-row ">
              <Image
              source={github}
              resizeMode="cover"
              className="w-8 h-7" />
              <Image
              source={face}
              resizeMode="cover"
              className="w-8 h-8 mx-5" />
              <Image
              source={google}
              resizeMode="cover"
              className="w-8 h-8" />
            </View>
        </View>
        <View className="flex justify-center items-center">
            <TouchableOpacity className="text-center border-[#064D7D] bg-[#064D7D] rounded-[8px] px-10 my-3 py-2 border w-36">
              <Text onPress={()=>navigation.navigate("ConfirmEmailScreen")} className="text-white font-extrabold text-[16px]">Register</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </>
  );
};

export default SignUpScreen;
