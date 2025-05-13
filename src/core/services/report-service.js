import { db, storage } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs-extra';
import path from 'path';

/**
 * Service for handling security report functionality with Firebase integration
 */
class ReportService {
  /**
   * Save a security report to Firestore
   * @param {Object} reportData - The security report data
   * @returns {Promise<string>} - The ID of the saved report
   */
  async saveReport(reportData) {
    try {
      const reportsCollection = collection(db, 'security-reports');
      const docRef = await addDoc(reportsCollection, {
        ...reportData,
        timestamp: new Date(),
      });
      
      console.log(`Report saved with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  }

  /**
   * Upload a report file (JSON, HTML, etc.) to Firebase Storage
   * @param {string} localFilePath - Path to the local file
   * @param {string} reportId - ID of the associated report
   * @returns {Promise<string>} - Download URL of the uploaded file
   */
  async uploadReportFile(localFilePath, reportId) {
    try {
      const fileBuffer = await fs.readFile(localFilePath);
      const fileName = path.basename(localFilePath);
      const fileRef = ref(storage, `reports/${reportId}/${fileName}`);
      
      const snapshot = await uploadBytes(fileRef, fileBuffer);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      // Update the report document with the file URL
      const reportRef = doc(db, 'security-reports', reportId);
      await updateDoc(reportRef, {
        reportUrl: downloadUrl,
        fileName: fileName
      });
      
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading report file:', error);
      throw error;
    }
  }

  /**
   * Get all reports from Firestore
   * @returns {Promise<Array>} - Array of report objects
   */
  async getAllReports() {
    try {
      const reportsSnapshot = await getDocs(collection(db, 'security-reports'));
      return reportsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  /**
   * Get a specific report by ID
   * @param {string} reportId - The report ID
   * @returns {Promise<Object>} - The report data
   */
  async getReportById(reportId) {
    try {
      const reportDoc = await getDoc(doc(db, 'security-reports', reportId));
      if (reportDoc.exists()) {
        return {
          id: reportDoc.id,
          ...reportDoc.data()
        };
      } else {
        throw new Error(`Report with ID ${reportId} not found`);
      }
    } catch (error) {
      console.error(`Error fetching report ${reportId}:`, error);
      throw error;
    }
  }
}

export default new ReportService(); 