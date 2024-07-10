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
const SignUpScreen = ({ navigation }: StackNavigationProps) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setCPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [facilities, setFacilities] = useState<{ label: string, value: string }[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('https://reachweb.brief.i.ng/api/v1/facilities');
        // console.log(response.data.data[0].name);
        const facilitiesData = response.data.data.map((facility: any) => ({ label: facility.name, value: facility.id }));
        console.log(facilitiesData);
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
    if (email && name && password && password_confirmation && username && city && country && occupation && selectedFacility) {
      setLoading(true);
      try {
        const response = await axios.post('https://reachweb.brief.i.ng/api/v1/register', {
          email,
          name,
          password,
          password_confirmation,
          city,
          username,
          country,
          occupation,
          facility_id: selectedFacility
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
          setCity('');
          setName('');
          setUsername('');
          setCountry('');
          setOccupation('');
          setSelectedFacility('');
          setUser(user);
          AsyncStorage.setItem('userInfo', JSON.stringify(user));
          navigation.navigate("SignInScreen");
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Registration Failed'
            // text2: response.data.message || 'Registration Failed'
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
        <StatusBar
          backgroundColor={COLORS.white}
          barStyle={"dark-content"}
          animated
        />
        <View>
          <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />
          <CustomPaperTextInput label="Name" value={name} onChangeText={setName} />
          <CustomPaperTextInput label="Username" value={username} onChangeText={setUsername} />
          <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
          <CustomPaperTextInput label="Confirm Password" value={password_confirmation} onChangeText={setCPassword} />
          <CustomPaperTextInput label="City/Town" value={city} onChangeText={setCity} />
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
          <CustomDropdown placeholder="Country" value={country} setValue={setCountry} />
          <CustomPaperTextInput label="Occupation" value={occupation} onChangeText={setOccupation} />
        </View>
       
        <View className="w-full flex justify-center items-center ">
          <TouchableOpacity onPress={SignupUser} className={`w-full my-10 h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}>
            <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Register'}</Text>
          </TouchableOpacity>
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
