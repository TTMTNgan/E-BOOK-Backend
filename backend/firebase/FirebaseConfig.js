import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, get, set, update, remove } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config cho ứng dụng React Native
const firebaseConfig = {
  apiKey: "AIzaSyALpnD1mYK7VuaFmuEDstaYHw8pzuHdZ7Y",
  authDomain: "e-book-ccea4.firebaseapp.com",
  databaseURL: "https://e-book-ccea4-default-rtdb.firebaseio.com",
  projectId: "e-book-ccea4",
  storageBucket: "e-book-ccea4.appspot.com",  // Đảm bảo đúng URL này
  messagingSenderId: "537469765673",
  appId: "1:537469765673:web:115c2137faa23463323438",
  measurementId: "G-6HF712MFV0",
};

const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với AsyncStorage để lưu trữ trạng thái đăng nhập
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Dùng AsyncStorage để lưu trạng thái xác thực
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export { auth, signInWithEmailAndPassword };
export const db = getDatabase(app);
