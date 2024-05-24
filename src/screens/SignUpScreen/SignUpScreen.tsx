import { View, Text, ScrollView, StatusBar, TouchableOpacity , Image, ActivityIndicator} from "react-native";
import React, {useState, useEffect} from "react";
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import CustomDropdown from "@/src/components/UI/Dropdown";
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import face from "@/assets/images/face.png";
import github from "@/assets/images/github.png";
import google from "@/assets/images/google.png";
import { createUserWithEmailAndPassword, signOut, getAuth, sendEmailVerification } from 'firebase/auth'
import { addDoc, getFirestore, collection, } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { firebaseAuth } from "@/firebaseConfig";



const SignUpScreen = ({ navigation }: StackNavigationProps) => {

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");

  const auth = firebaseAuth;
  const [loading, setLoading] = useState(false);

  //initialise firebase firesore database
  const db = getFirestore();

  const SignupUser = async() => {
    if (fullName && email && username && password && city && country && occupation) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(response.user);
        const colref = collection(db, 'users_data');
        await addDoc(colref, {
          full_name: fullName,
          user_id: response.user.uid,
          email: email,
          username: username,
          city: city,
          country: country,
          occupation: occupation
        }).then(() => {
          setLoading(false)
          Toast.show({
            type: 'success',
            text1: 'Success!',
            text2: 'Account created successfully, Please verify your email address to login.'
          });
          signOut(auth);
          setLoading(false);
          setEmail('');
          setPassword('');
          setFullName('');
          setCity('');
          setUsername('');
          setCountry('');
          setOccupation('');
          navigation.navigate("ConfirmEmailScreen")
        });
      } catch (error: any) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error.message
        });
      }
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please fill all empty fields'
      })
    }
    console.log(fullName, email, username, password, city, country, occupation);
  }

  return (
    <>
    <ScrollView className="flex-1 bg-white px-4 pt-5">
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle={"dark-content"}
        animated
      />
      <View>
        
        <CustomPaperTextInput label="Full Name" value={fullName} onChangeText={setFullName} />
        <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />
        <CustomPaperTextInput label="Username" value={username} onChangeText={setUsername} />
        <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
        <CustomPaperTextInput label="City/Town" value={city} onChangeText={setCity} />
        <CustomDropdown placeholder="Country" value={country} setValue={setCountry}  />
        <CustomPaperTextInput label="Occupation" value={occupation} onChangeText={setOccupation} />
       
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
          <TouchableOpacity onPress={SignupUser} className="text-center border-[#064D7D] bg-[#064D7D] rounded-[8px] px-8 my-3 py-2 border w-32">
            <Text className="text-white font-extrabold text-[16px]">{loading ? <ActivityIndicator /> : 'Register'}</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
    </>
  );
};

export default SignUpScreen;
