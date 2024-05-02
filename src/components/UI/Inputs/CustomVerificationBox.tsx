import { COLORS } from "@/src/theme/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export const CustomVerificationBox = ({
  customClassName,
}: {
  customClassName?: string;
}) => {
  return (
    <View className={`mt-7 w-64 ${customClassName}`}>
      <OtpInput
        numberOfDigits={4}
        onTextChange={(text) => console.log(text)}
        theme={{
          containerStyle: {
            marginTop: 10,
          },
          pinCodeContainerStyle: {
            width: "20%",
          },
          focusedPinCodeContainerStyle: {
            borderColor: COLORS.textColor,
          },
        }}
      />

     <View className="mx-10">
        <Text className="text-textColor my-9 text-sm">Haven't received the code yet?</Text> 
        <Text className="text-gray3 text-sm">Tap here to resend the OTP</Text>
     </View>
     
    </View>
  );
};
