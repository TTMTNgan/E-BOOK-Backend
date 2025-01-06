import { db } from '../firebase/FirebaseConfig';
import { ref, set, remove } from 'firebase/database';

// Thêm sách vào danh sách đang đọc
export const addToReading = async (userId, bookId) => {
  const userReadingRef = ref(db, `users/${userId}/reading/${bookId}`);
  try {
    await set(userReadingRef, true); // Đánh dấu sách là đang đọc
    return { success: true, message: 'Sách đã được thêm vào danh sách đang đọc' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Xóa sách khỏi danh sách đang đọc
export const removeFromReading = async (userId, bookId) => {
  const userReadingRef = ref(db, `users/${userId}/reading/${bookId}`);
  try {
    await remove(userReadingRef); // Xóa sách khỏi danh sách đang đọc
    return { success: true, message: 'Sách đã được xóa khỏi danh sách đang đọc' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};
