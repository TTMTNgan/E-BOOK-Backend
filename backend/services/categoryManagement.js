import { db } from '../firebase/FirebaseConfig';
import { ref, get, set, update, remove } from 'firebase/database';

// Lấy danh sách thể loại sách
export const getCategories = async () => {
  const categoriesRef = ref(db, 'categories');
  const snapshot = await get(categoriesRef);
  return snapshot.val();
};

// Thêm thể loại mới
export const addCategory = async (categoryId, categoryData) => {
  const categoryRef = ref(db, `categories/${categoryId}`);
  try {
    await set(categoryRef, categoryData);
    return { success: true, message: 'Thể loại đã được thêm thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cập nhật thông tin thể loại
export const updateCategory = async (categoryId, updatedData) => {
  const categoryRef = ref(db, `categories/${categoryId}`);
  try {
    await update(categoryRef, updatedData);
    return { success: true, message: 'Thông tin thể loại đã được cập nhật' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Xóa thể loại
export const deleteCategory = async (categoryId) => {
  const categoryRef = ref(db, `categories/${categoryId}`);
  try {
    await remove(categoryRef);
    return { success: true, message: 'Thể loại đã được xóa' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
