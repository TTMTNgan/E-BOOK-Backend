import { db } from '../firebase/FirebaseConfig';
import { ref, set, remove } from 'firebase/database';

// Đánh dấu sách là đã đọc xong (chuyển từ đang đọc sang đã đọc xong)
export const markAsFinished = async (userId, bookId) => {
  const userReadingRef = ref(db, `users/${userId}/reading/${bookId}`);
  const userFinishedRef = ref(db, `users/${userId}/finished/${bookId}`);
  
  try {
    // Di chuyển sách từ đang đọc sang đã đọc xong
    await remove(userReadingRef); // Xóa khỏi danh sách đang đọc
    await set(userFinishedRef, true); // Thêm vào danh sách đã đọc xong
    return { success: true, message: 'Sách đã được đánh dấu là đã đọc xong' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Xóa sách khỏi danh sách đã đọc xong
export const removeFromFinished = async (userId, bookId) => {
  const userFinishedRef = ref(db, `users/${userId}/finished/${bookId}`);
  try {
    await remove(userFinishedRef); // Xóa sách khỏi danh sách đã đọc xong
    return { success: true, message: 'Sách đã được xóa khỏi danh sách đã đọc xong' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};
