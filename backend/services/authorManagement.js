import { db } from '../firebase/FirebaseConfig';
import { ref, get, set, update, remove } from 'firebase/database';

// Lấy danh sách tác giả
export const getAuthors = async () => {
  const authorsRef = ref(db, 'authors');
  const snapshot = await get(authorsRef);
  return snapshot.val();
};

// Thêm tác giả mới
export const addAuthor = async (authorId, authorData) => {
  const authorRef = ref(db, `authors/${authorId}`);
  try {
    await set(authorRef, authorData);
    return { success: true, message: 'Tác giả đã được thêm thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cập nhật thông tin tác giả
export const updateAuthor = async (authorId, updatedData) => {
  const authorRef = ref(db, `authors/${authorId}`);
  try {
    await update(authorRef, updatedData);
    return { success: true, message: 'Thông tin tác giả đã được cập nhật' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Xóa tác giả
export const deleteAuthor = async (authorId) => {
  const authorRef = ref(db, `authors/${authorId}`);
  try {
    await remove(authorRef);
    return { success: true, message: 'Tác giả đã được xóa' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
