import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <View className="items-start">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="border border-neutral-300 rounded-full p-1 flex-row items-center"
      >
        <Feather name="arrow-left" size={17} />
      </TouchableOpacity>
    </View>
  );
};
