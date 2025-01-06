import { db } from '../firebase/FirebaseConfig';
import { ref, get, set, update, remove } from 'firebase/database';

// Lấy danh sách báo cáo
export const getReports = async () => {
  const reportsRef = ref(db, 'reports');
  const snapshot = await get(reportsRef);
  return snapshot.val();
};

// Thêm báo cáo
export const addReport = async (reportId, reportData) => {
  const reportRef = ref(db, `reports/${reportId}`);
  try {
    await set(reportRef, reportData);
    return { success: true, message: 'Báo cáo đã được thêm thành công' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cập nhật báo cáo
export const updateReport = async (reportId, updatedData) => {
  const reportRef = ref(db, `reports/${reportId}`);
  try {
    await update(reportRef, updatedData);
    return { success: true, message: 'Báo cáo đã được cập nhật' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Xóa báo cáo
export const deleteReport = async (reportId) => {
  const reportRef = ref(db, `reports/${reportId}`);
  try {
    await remove(reportRef);
    return { success: true, message: 'Báo cáo đã được xóa' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
