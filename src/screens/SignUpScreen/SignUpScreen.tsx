import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { Dropdown } from 'react-native-element-dropdown';
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import Toast from 'react-native-toast-message';
import CustomDropdown from "@/src/components/UI/Dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@/src/config";

const SignUpScreen = ({ navigation }: StackNavigationProps) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [years_of_work, setYear] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setCPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [facilities, setFacilities] = useState<{ label: string, value: string }[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age_group, setAge] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}facilities`);
        const facilitiesData = response.data.data.map((facility: any) => ({ label: facility.name, value: facility.id }));
        setFacilities(facilitiesData);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Failed to fetch facilities'
        });
      }
    };
    fetchFacilities();
  }, []);

  const SignupUser = async () => {
    if (email && name && password && password_confirmation && age_group && years_of_work && occupation && selectedFacility && gender) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}register`, {
          email,
          name,
          password,
          password_confirmation,
          // city,
          age_group,
          years_of_work,
          // country,
          occupation,
          facility_id: selectedFacility,
          gender
        });
        const user = response.data
        if (response.data.success) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Success!',
            text2: 'Account created successfully, Please verify your email address to login.'
          });
          setEmail('');
          setPassword('');
          setCPassword('');
          // setCity('');
          setYear('');
          setAge('');
          setName('');
          // setCountry('');
          setOccupation('');
          setSelectedFacility('');
          setGender('');
          setUser(user);
          AsyncStorage.setItem('userInfo', JSON.stringify(user));
          navigation.navigate("SignInScreen");
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Registration Failed'
          });
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error.response?.data?.message || error.message
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please fill all empty fields'
      })
    }
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white px-4 pt-5">
        <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} animated />
        <View>
          <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />
          <CustomPaperTextInput label="Name" value={name} onChangeText={setName} />
          <CustomPaperTextInput label="Years of experience" value={years_of_work} onChangeText={setYear} />
          <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
          <CustomPaperTextInput label="Confirm Password" value={password_confirmation} onChangeText={setCPassword} />
          {/* <CustomPaperTextInput label="City/Town" value={city} onChangeText={setCity} /> */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={facilities}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Facility"
            value={selectedFacility}
            onChange={item => {
              setSelectedFacility(item.value);
              setIsFocus(false)
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" }
            ]}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Gender"
            value={gender}
            onChange={item => {
              setGender(item.value);
              setIsFocus(false)
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "0-18", value: "0-18" },
              { label: "19-30", value: "19-30" },
              { label: "31-40", value: "31-40" },
              { label: "41-50", value: "41-50" },
              { label: "51-60", value: "51-60" },
              { label: "61-70", value: "61-70" },
            ]}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Age Group"
            value={age_group}
            onChange={item => {
              setAge(item.value);
              setIsFocus(false)
            }}
          />
          <CustomPaperTextInput label="Occupation" value={occupation} onChangeText={setOccupation} />
        </View>

        <View className="w-full flex justify-center items-center my-10">
          <TouchableOpacity onPress={SignupUser} className={`w-full  h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}>
            <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Register'}</Text>
          </TouchableOpacity>
          <Text className="text-left mt-2 text-base">Already have an account? <Text className='underline' onPress={() => navigation.navigate('SignUpScreen')}>Sign in</Text></Text>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#666666",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 28,
    marginBottom: 20,
    backgroundColor: '#F7F7F7'
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
