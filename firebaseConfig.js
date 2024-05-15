// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACxaab4ADTgKdl-AZg705dG-LhDv1Tm7w",
  authDomain: "reachmobileapp-802d7.firebaseapp.com",
  projectId: "reachmobileapp-802d7",
  storageBucket: "reachmobileapp-802d7.appspot.com",
  messagingSenderId: "168988147327",
  appId: "1:168988147327:web:35c47dffcd1111ddb7894a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const IStorage = getReactNativePersistence(AsyncStorage)
export const firebaseAuth = initializeAuth(app, {persistence: IStorage})
