import express from 'express';
import multer from 'multer';
import path from 'path';
import { db, storage } from './firebaseConfig';  // Import Firebase config

const app = express();
const port = 3000;

// Cấu hình multer để xử lý tệp tải lên
const upload = multer({ dest: 'uploads/' });

// API tải ảnh bìa, nội dung sách và avatar lên Firebase Storage
app.post('/upload-book-and-avatar', upload.fields([
  { name: 'image', maxCount: 1 },      // Tải ảnh bìa
  { name: 'content', maxCount: 1 },     // Tải nội dung sách
  { name: 'avatar', maxCount: 1 }      // Tải avatar người dùng
]), async (req, res) => {
  try {
    // Kiểm tra các tệp được tải lên
    const { image, content, avatar } = req.files;
    const { userId, bookId, bookData } = req.body;  // Lấy thông tin người dùng và sách từ body request

    // Khởi tạo bucket từ Firebase Storage
    const bucket = storage.bucket();

    // Tải ảnh bìa sách lên Firebase Storage
    const coverImageRef = bucket.file(`image/${image[0].originalname}`);
    await bucket.upload(path.join(__dirname, image[0].path), {
      destination: coverImageRef,
      metadata: { contentType: image[0].mimetype },
    });
    const coverImageUrl = `https://storage.googleapis.com/${bucket.name}/image/${coverImageRef.name}`;

    // Tải nội dung sách lên Firebase Storage
    const bookContentRef = bucket.file(`content/${content[0].originalname}`);
    await bucket.upload(path.join(__dirname, content[0].path), {
      destination: bookContentRef,
      metadata: { contentType: content[0].mimetype },
    });
    const bookContentUrl = `https://storage.googleapis.com/${bucket.name}/content/${bookContentRef.name}`;

    // Tải ảnh avatar lên Firebase Storage (nếu có)
    let avatarUrl = null;
    if (avatar && avatar[0]) {
      const avatarRef = bucket.file(`avatar/${avatar[0].originalname}`);
      await bucket.upload(path.join(__dirname, avatar[0].path), {
        destination: avatarRef,
        metadata: { contentType: avatar[0].mimetype },
      });
      avatarUrl = `https://storage.googleapis.com/${bucket.name}/avatar/${avatarRef.name}`;
    }

    // Lưu thông tin vào Realtime Database
    const bookRef = db.ref(`books/${bookId}`);
    const userRef = db.ref(`users/${userId}`);

    // Lưu thông tin sách và URL ảnh bìa, nội dung sách vào Realtime Database
    await bookRef.set({
      ...bookData,
      cover_image_url: coverImageUrl,
      content_url: bookContentUrl,
    });

    // Lưu URL avatar vào thông tin người dùng (nếu có)
    if (avatarUrl) {
      await userRef.update({ avatar: avatarUrl });
    }

    // Trả về kết quả
    res.json({
      success: true,
      message: 'Tải ảnh bìa, nội dung sách và avatar thành công',
      coverImageUrl,
      bookContentUrl,
      avatarUrl: avatarUrl || 'No avatar uploaded',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
