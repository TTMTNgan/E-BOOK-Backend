import { db } from '../firebase/FirebaseConfig';
import { ref, get, set, update, remove } from 'firebase/database';

// Lấy danh sách sách
export const getBooks = async () => {
  try {
    const booksRef = ref(db, 'books'); // Đường dẫn tới danh sách sách
    const snapshot = await get(booksRef); // Lấy snapshot dữ liệu từ Realtime Database
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() }; // Trả về danh sách sách nếu có dữ liệu
    } else {
      return { success: false, message: 'Không tìm thấy sách' };
    }
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Thêm sách mới
export const addBook = async (bookId, bookData) => {
  const bookRef = ref(db, `books/${bookId}`); // Đường dẫn tới sách mới
  try {
    await set(bookRef, bookData); // Thêm sách vào Realtime Database
    return { success: true, message: 'Sách đã được thêm thành công' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Cập nhật thông tin sách
export const updateBook = async (bookId, updatedData) => {
  const bookRef = ref(db, `books/${bookId}`); // Đường dẫn tới sách cần cập nhật
  try {
    await update(bookRef, updatedData); // Cập nhật thông tin sách
    return { success: true, message: 'Thông tin sách đã được cập nhật' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};

// Xóa sách
export const deleteBook = async (bookId) => {
  const bookRef = ref(db, `books/${bookId}`); // Đường dẫn tới sách cần xóa
  try {
    await remove(bookRef); // Xóa sách khỏi Realtime Database
    return { success: true, message: 'Sách đã được xóa' };
  } catch (error) {
    return { success: false, message: error.message }; // Xử lý lỗi nếu có
  }
};
