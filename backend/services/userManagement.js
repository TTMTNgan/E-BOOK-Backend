import { db } from '../firebase/FirebaseConfig';
import { ref, get, set, update, remove } from 'firebase/database';

// Lấy danh sách người dùng
export const getUsers = async () => {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  return snapshot.val();
};

// Thêm người dùng mới
export const addUser = async (userId, userData) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    await set(userRef, userData);
    return { success: true, message: 'Người dùng đã được thêm thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, updatedData) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    await update(userRef, updatedData);
    return { success: true, message: 'Thông tin người dùng đã được cập nhật' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    await remove(userRef);
    return { success: true, message: 'Người dùng đã được xóa' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
