import { db } from '../firebase/FirebaseConfig';
import { ref, set, remove } from 'firebase/database';

// Thêm sách vào danh sách yêu thích
export const addToFavorites = async (userId, bookId) => {
  const userFavoritesRef = ref(db, `users/${userId}/favorites/${bookId}`);
  try {
    await set(userFavoritesRef, true); // Đánh dấu sách là yêu thích
    return { success: true, message: 'Sách đã được thêm vào danh sách yêu thích' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Xóa sách khỏi danh sách yêu thích
export const removeFromFavorites = async (userId, bookId) => {
  const userFavoritesRef = ref(db, `users/${userId}/favorites/${bookId}`);
  try {
    await remove(userFavoritesRef); // Xóa sách khỏi danh sách yêu thích
    return { success: true, message: 'Sách đã được xóa khỏi danh sách yêu thích' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};
