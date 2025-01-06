// services/commentsManagement.js
import { db } from '../firebase/FirebaseConfig';
import { ref, push, set, get } from 'firebase/database';

// Thêm bình luận mới cho sách
export const addComment = async (bookId, commentData) => {
  try {
    const commentsRef = ref(db, `books/${bookId}/comments`); // Trỏ đến đường dẫn bình luận của sách
    const newCommentRef = push(commentsRef); // Tạo ID tự động cho bình luận mới
    await set(newCommentRef, commentData); // Lưu bình luận vào cơ sở dữ liệu
    return { success: true, message: 'Bình luận đã được thêm thành công', commentId: newCommentRef.key };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Lấy danh sách bình luận của sách
export const getComments = async (bookId) => {
  try {
    const commentsRef = ref(db, `books/${bookId}/comments`); // Trỏ đến đường dẫn bình luận của sách
    const snapshot = await get(commentsRef); // Lấy dữ liệu từ Firebase
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Trả về danh sách bình luận
    } else {
      return []; // Trả về mảng rỗng nếu không có bình luận
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Thêm đánh giá cho sách (có thể kết hợp với bình luận)
export const addRating = async (bookId, ratingData) => {
  try {
    const ratingsRef = ref(db, `books/${bookId}/ratings`); // Trỏ đến đường dẫn đánh giá của sách
    const newRatingRef = push(ratingsRef); // Tạo ID tự động cho đánh giá mới
    await set(newRatingRef, ratingData); // Lưu đánh giá vào cơ sở dữ liệu
    return { success: true, message: 'Đánh giá đã được thêm thành công', ratingId: newRatingRef.key };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
