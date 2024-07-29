// import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
// import { Dropdown } from 'react-native-element-dropdown';
// import { StackNavigationProps } from "@/src/shared";
// import { COLORS } from "@/src/theme/colors";
// import Toast from 'react-native-toast-message';
// import CustomDropdown from "@/src/components/UI/Dropdown";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from "@/src/config";

// const SignUpScreen = ({ navigation }: StackNavigationProps) => {
//   const [fullName, setFullName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [facility, setFacility] = useState<string>("");
//   const [years_of_work, setYear] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [password_confirmation, setCPassword] = useState<string>("");
//   const [city, setCity] = useState<string>("");
//   const [country, setCountry] = useState<string>("");
//   const [occupation, setOccupation] = useState<string>("");
//   const [other_occupation, setOtherOccupation] = useState<string>("");
//   const [sites, setSites] = useState<{ label: string, value: string }[]>([]);
//   const [selectedSite, setSelectedSite] = useState<string>("");
//   const [selectedAge, setSelectedAge] = useState<string>("");
//   const [selectedGender, setSelectedGender] = useState<string>("");
//   const [selectedTrain, setSelectedTrain] = useState<string>("");
//   const [gender, setGender] = useState<{ label: string, value: string }[]>([]);
//   const [age_group, setAge] = useState<{ label: string, value: string }[]>([]);
//   const [type_of_trainee, setTrainee] = useState<{ label: string, value: string }[]>([]);
//   const [isFocus, setIsFocus] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}sites`);
//         const sitesData = response.data.data.map((site: any) => ({ label: site.name, value: site.id }));
//         setSites(sitesData);
//       } catch (error) {
//         console.error('Error fetching Sites:', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Error!',
//           text2: 'Failed to fetch Sites'
//         });
//       }
//     };
//     fetchSites();
//   }, []);

//   const SignupUser = async () => {
//     if (email && name && password && password_confirmation && selectedAge && years_of_work && facility && (occupation || other_occupation) && selectedSite && selectedGender && selectedTrain) {
//       setLoading(true);
//       try {
//         const response = await axios.post(`${BASE_URL}register`, {
//           email,
//           name,
//           password,
//           password_confirmation,
//           age_group: selectedAge,
//           site_id: selectedSite,
//           type_of_trainee: selectedTrain,
//           facility,
//           gender: selectedGender,
//           years_of_work,
//           occupation: occupation === "Others" ? other_occupation : occupation,
//         });
//         const user = response.data
//         if (response.data.success) {
//           setLoading(false);
//           Toast.show({
//             type: 'success',
//             text1: 'Success!',
//             text2: 'Account created successfully, Please verify your email address to login.'
//           });
//           setEmail('');
//           setPassword('');
//           setCPassword('');
//           setYear('');
//           setSelectedAge('');
//           setFacility('');
//           setOtherOccupation('');
//           setName('');
//           setSelectedTrain('');
//           setOccupation('');
//           setSelectedSite('');
//           setSelectedGender('');
//           setUser(user);
//           //AsyncStorage.setItem('userInfo', JSON.stringify(user));
//           navigation.navigate("ConfirmEmailScreen");
//         } else {
//           setLoading(false);
//           Toast.show({
//             type: 'error',
//             text1: 'Error!',
//             text2: 'Registration Failed'
//           });
//         }
//       } catch (error: any) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error!',
//           text2: error.response?.data?.message || error.message
//         });
//         console.log(error.response?.data?.message);
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//       Toast.show({
//         type: 'error',
//         text1: 'Error!',
//         text2: 'Please fill all empty fields'
//       })
//     }
//   }

//   return (
//     <>
//       <ScrollView className="flex-1 bg-white px-4 pt-5">
//         <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} animated />
//         <View>
//           <CustomPaperTextInput label="Name" value={name} onChangeText={setName} />
//           <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />


//           <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
//           <CustomPaperTextInput label="Confirm Password" value={password_confirmation} onChangeText={setCPassword} />

//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
//             placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
//             selectedTextStyle={styles.placeholderStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={[
//               { label: "< 19", value: "0-18" },
//               { label: "19-30", value: "19-30" },
//               { label: "31-40", value: "31-40" },
//               { label: "41-50", value: "41-50" },
//               { label: "51-60", value: "51-60" },
//               { label: "61-70", value: "61-70" },
//             ]}
//             labelField="label"
//             valueField="value"
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             placeholder="Select Age Group"
//             value={selectedAge}
//             onChange={item => {
//               setSelectedAge(item.value);
//               setIsFocus(false)
//             }}
//           />
//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
//             placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
//             selectedTextStyle={styles.placeholderStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={sites}
//             labelField="label"
//             valueField="value"
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             placeholder="Select Site"
//             value={selectedSite}
//             onChange={item => {
//               setSelectedSite(item.value);
//               setIsFocus(false)
//             }}
//           />
//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
//             placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
//             selectedTextStyle={styles.placeholderStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={[
//               { label: "Male", value: "Male" },
//               { label: "Female", value: "Female" },
//               { label: "Prefer Not To Say", value: "Prefer not to say" }
//             ]}
//             labelField="label"
//             valueField="value"
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             placeholder="Select Gender"
//             value={selectedGender}
//             onChange={item => {
//               setSelectedGender(item.value);
//               setIsFocus(false)
//             }}
//           />

//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
//             placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
//             selectedTextStyle={styles.placeholderStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={[
//               { label: "Working Professional (In service)", value: "Working Professional (In service)" },
//               { label: "Student (Pre service)", value: "Student (Pre service)" },
//             ]}
//             labelField="label"
//             valueField="value"
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             placeholder="Select type of training"
//             value={selectedTrain}
//             onChange={item => {
//               setSelectedTrain(item.value);
//               setIsFocus(false)
//             }}
//           />
//           <CustomPaperTextInput label="Facility" value={facility} onChangeText={setFacility} />
//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
//             placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
//             selectedTextStyle={styles.placeholderStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={[
//               { label: "Midwife", value: "Midwife" },
//               { label: "Nurse", value: "Nurse" },
//               { label: "Physician", value: "Physician" },
//               { label: "Community health extension worker/ community health officer", value: "Community health extension worker/ community health officer" },
//               { label: "Others", value: "Others" }
//             ]}
//             labelField="label"
//             valueField="value"
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             placeholder="Select Occupation"
//             value={occupation}
//             onChange={item => {
//               setOccupation(item.value);
//               setIsFocus(false);
//             }}
//           />
//           {occupation === "Others" && (
//             <CustomPaperTextInput label="Please specify your occupation" value={other_occupation} onChangeText={setOtherOccupation} />
//           )}
//           <CustomPaperTextInput label="Years of Experience" value={years_of_work} onChangeText={setYear} />
//         </View>

//         <View className="w-full flex justify-center items-center my-10">
//           <TouchableOpacity onPress={SignupUser} className={`w-full  h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}>
//             <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Register'}</Text>
//           </TouchableOpacity>
//           <Text className="text-left mt-2 text-base">Already have an account? <Text className='underline' onPress={() => navigation.navigate('SignInScreen')}>Sign in</Text></Text>
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   dropdown: {
//     height: 50,
//     borderColor: "#666666",
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 28,
//     marginBottom: 20,
//     backgroundColor: '#F7F7F7'
//   },
//   placeholderStyle: {
//     fontSize: 14,
//     marginLeft: 10,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 20,
//     fontSize: 16,
//   },
// });
import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import CustomPaperTextInput from "@/src/components/UI/Inputs/CustomPaperTextInput";
import { Dropdown } from 'react-native-element-dropdown';
import { StackNavigationProps } from "@/src/shared";
import { COLORS } from "@/src/theme/colors";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@/src/config";

const SignUpScreen = ({ navigation }: StackNavigationProps) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [facility, setFacility] = useState<string>("");
  const [years_of_work, setYear] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setCPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [other_occupation, setOtherOccupation] = useState<string>("");
  const [sites, setSites] = useState<{ label: string, value: string }[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedTrain, setSelectedTrain] = useState<string>("");
  const [gender, setGender] = useState<{ label: string, value: string }[]>([]);
  const [age_group, setAge] = useState<{ label: string, value: string }[]>([]);
  const [type_of_trainee, setTrainee] = useState<{ label: string, value: string }[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}sites`);
        const sitesData = response.data.data.map((site: any) => ({ label: site.name, value: site.id }));
        setSites(sitesData);
      } catch (error) {
        console.error('Error fetching Sites:', error);
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Failed to fetch Sites'
        });
      }
    };
    fetchSites();
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const SignupUser = async () => {
    if (email && name && password && password_confirmation && selectedAge && years_of_work && facility && (occupation || other_occupation) && selectedSite && selectedGender && selectedTrain) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}register`, {
          email,
          name,
          password,
          password_confirmation,
          age_group: selectedAge,
          site_id: selectedSite,
          type_of_trainee: selectedTrain,
          facility,
          gender: selectedGender,
          years_of_work,
          occupation: occupation === "Others" ? other_occupation : occupation,
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
          setYear('');
          setSelectedAge('');
          setFacility('');
          setOtherOccupation('');
          setName('');
          setSelectedTrain('');
          setOccupation('');
          setSelectedSite('');
          setSelectedGender('');
          setUser(user);
          await delay(2000); // delay for 2 seconds
          navigation.navigate("ConfirmEmailScreen");
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
        console.log(error.response?.data?.message);
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
          <CustomPaperTextInput label="Name" value={name} onChangeText={setName} />
          <CustomPaperTextInput label="Email Address" value={email} onChangeText={setEmail} />
          <CustomPaperTextInput label="Password" value={password} onChangeText={setPassword} />
          <CustomPaperTextInput label="Confirm Password" value={password_confirmation} onChangeText={setCPassword} />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "< 19", value: "0-18" },
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
            value={selectedAge}
            onChange={item => {
              setSelectedAge(item.value);
              setIsFocus(false)
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={sites}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Site"
            value={selectedSite}
            onChange={item => {
              setSelectedSite(item.value);
              setIsFocus(false)
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Prefer Not To Say", value: "Prefer not to say" }
            ]}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Gender"
            value={selectedGender}
            onChange={item => {
              setSelectedGender(item.value);
              setIsFocus(false)
            }}
          />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "Working Professional (In service)", value: "Working Professional (In service)" },
              { label: "Student (Pre service)", value: "Student (Pre service)" },
            ]}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select type of training"
            value={selectedTrain}
            onChange={item => {
              setSelectedTrain(item.value);
              setIsFocus(false)
            }}
          />
          <CustomPaperTextInput label="Facility" value={facility} onChangeText={setFacility} />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.textColor }]}
            placeholderStyle={[styles.placeholderStyle, { color: COLORS.textColor }]}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={[
              { label: "Midwife", value: "Midwife" },
              { label: "Nurse", value: "Nurse" },
              { label: "Physician", value: "Physician" },
              { label: "Community health extension worker/ community health officer", value: "Community health extension worker/ community health officer" },
              { label: "Others", value: "Others" }
            ]}
            labelField="label"
            valueField="value"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Occupation"
            value={occupation}
            onChange={item => {
              setOccupation(item.value);
              setIsFocus(false);
            }}
          />
          {occupation === "Others" && (
            <CustomPaperTextInput label="Please specify your occupation" value={other_occupation} onChangeText={setOtherOccupation} />
          )}
          <CustomPaperTextInput label="Years of Experience" value={years_of_work} onChangeText={setYear} />
        </View>

        <View className="w-full flex justify-center items-center my-10">
          <TouchableOpacity onPress={SignupUser} className={`w-full  h-14 rounded-[8px]  justify-center items-center bg-[#064D7D] text-white`}>
            <Text className="text-white font-extrabold text-2xl">{loading ? <ActivityIndicator /> : 'Register'}</Text>
          </TouchableOpacity>
          <Text className="text-left mt-2 text-base">Already have an account? <Text className='underline' onPress={() => navigation.navigate('SignInScreen')}>Sign in</Text></Text>
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
