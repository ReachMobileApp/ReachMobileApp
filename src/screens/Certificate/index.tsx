import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';
import { BASE_URL } from '../../config';

const CertificateScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.data.auth_token;
          const response = await axios.get(
            `${BASE_URL}certificate/01j1bdmvf8wk0asczzbgx1c6yy`,
            { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer' }
          );
          const base64Image = Buffer.from(response.data, 'binary').toString('base64');
          setCertificate(base64Image);
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        Alert.alert('Error', 'Failed to fetch certificate.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, []);

  const requestFileWritePermission = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      Alert.alert("Permission Denied", "File write permission is required to save the certificate.");
      return { access: false, directoryUri: null };
    }
    return { access: true, directoryUri: permissions.directoryUri };
  };

  const downloadCertificate = async (base64Image: string) => {
    try {
      const hasPermissions = await requestFileWritePermission();
      if (!hasPermissions.access) {
        return;
      }

      const directoryUri = hasPermissions.directoryUri || '';
      const fileName = `certificate.png`;
      const fileUri = await StorageAccessFramework.createFileAsync(directoryUri, fileName, 'image/png');

      await FileSystem.writeAsStringAsync(fileUri, base64Image, { encoding: FileSystem.EncodingType.Base64 });

      Alert.alert('Success', `Certificate downloaded as ${fileName}`);
    } catch (error) {
      console.error('Error saving file:', error);
      Alert.alert('Error', 'Failed to save certificate.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#064d7d" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-2">
      <View className="bg-[#064d7d]">
        <View className="flex-row justify-between items-center py-3 mb-2 px-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Certificate</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <View className="flex-1 justify-center items-center px-4">
        {certificate ? (
          <View className="w-full p-4">
            <Text className="text-2xl text-[#064d7d] font-bold mb-4 text-center">Congratulations!</Text>
            <View className="border border-gray-300 rounded-lg p-4 mb-4">
              <Text className="text-lg text-gray-700 mb-2 text-center">You have successfully completed all modules and earned a certificate.</Text>
              <Text className="text-lg text-gray-700 text-center">To download your certificate, please click the button below.</Text>
            </View>
            <TouchableOpacity
              onPress={() => downloadCertificate(certificate)}
              className="bg-[#064d7d] p-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg font-semibold">Download Certificate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-lg text-gray-700 text-center">No certificate earned yet.</Text>
        )}
      </View>
    </View>
  );
};

export default CertificateScreen;
