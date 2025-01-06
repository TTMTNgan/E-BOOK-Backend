import { db } from '../firebase/FirebaseConfig';
import { ref, push, set } from 'firebase/database';

// Thêm chương mới vào sách
export const addChapter = async (bookId, chapterData) => {
  try {
    const chapterRef = ref(db, `books/${bookId}/chapters`); // Dùng ref để trỏ tới các chương của sách
    const newChapterRef = push(chapterRef); // Tạo ID tự động cho chương mới
    await set(newChapterRef, chapterData); // Lưu dữ liệu chương vào cơ sở dữ liệu
    return { success: true, message: 'Chương đã được thêm thành công', chapterId: newChapterRef.key };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateChapter = async (bookId, chapterId, chapterData) => {
  try {
    const chapterRef = ref(db, `books/${bookId}/chapters/${chapterId}`); // Lấy tham chiếu đến chương cần cập nhật
    await update(chapterRef, chapterData); // Cập nhật dữ liệu chương
    return { success: true, message: 'Chương đã được cập nhật thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
// Xóa chương sách
export const deleteChapter = async (bookId, chapterId) => {
  try {
    const chapterRef = ref(db, `books/${bookId}/chapters/${chapterId}`); // Lấy tham chiếu đến chương cần xóa
    await remove(chapterRef); // Xóa chương
    return { success: true, message: 'Chương đã được xóa thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};