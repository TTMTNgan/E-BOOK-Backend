// services/notifications.js
import messaging from '@react-native-firebase/messaging';
import { db } from '../firebase/FirebaseConfig';
import { ref, set, get } from 'firebase/database';

// Gửi thông báo cho người dùng
export const sendNotification = async (title, body, tokens) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      tokens,
    };
    
    // Gửi thông báo qua Firebase Cloud Messaging (FCM)
    // Bạn có thể sử dụng Firebase Cloud Functions hoặc third-party services để gửi thông báo
    const response = await messaging().sendMulticast(message);
    return { success: true, message: 'Thông báo đã được gửi thành công', response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Đăng ký token FCM cho người dùng và lưu vào Realtime Database
export const subscribeToNotifications = async (userId) => {
  try {
    const token = await messaging().getToken();
    
    // Lưu token FCM vào Realtime Database thay vì Firestore
    const userRef = ref(db, `users/${userId}/fcm_token`);
    
    await set(userRef, token); // Lưu token vào cơ sở dữ liệu Realtime Database
    
    return { success: true, message: 'Token thông báo đã được lưu thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Lấy token FCM của người dùng
export const getFCMToken = async (userId) => {
  try {
    const tokenRef = ref(db, `users/${userId}/fcm_token`);
    const snapshot = await get(tokenRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Trả về token nếu tồn tại
    } else {
      return null; // Nếu không có token
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
