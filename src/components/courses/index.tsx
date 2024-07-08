import axios from 'axios';
import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get('https://reachweb.brief.i.ng/api/v1/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setCourses(response.data.data);
        console.log(courses)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#064d7d" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white pt-2">
      {courses.map(course => (
        <View key={course.id} className="p-4">
          <Text className="text-xl font-bold">{course.title}</Text>
          <Text className="text-gray-600">{course.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CoursesScreen;


