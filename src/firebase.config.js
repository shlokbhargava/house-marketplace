import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD4wNFaCsHnC3Qjvq7FqmeqRPEaWMEuopc",
  authDomain: "house-marketplace-9adf4.firebaseapp.com",
  projectId: "house-marketplace-9adf4",
  storageBucket: "house-marketplace-9adf4.appspot.com",
  messagingSenderId: "1060986485018",
  appId: "1:1060986485018:web:5141132d5b1756527d94a3"
};


initializeApp(firebaseConfig)
export const db = getFirestore()