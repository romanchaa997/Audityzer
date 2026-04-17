const { db, storage } = require('./firebase');
const fs = require('fs-extra');
const path = require('path');

// Lazy-load firebase/firestore and firebase/storage only if available
let firestoreFns = null;
let storageFns = null;

try {
  firestoreFns = require('firebase/firestore');
} catch (e) {
  // firebase/firestore not available
}

try {
  storageFns = require('firebase/storage');
} catch (e) {
  // firebase/storage not available
}

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
    if (!db || !firestoreFns) {
      console.warn('Firebase not available. Report saved locally only.');
      return `local-${Date.now()}`;
    }
    try {
      const { collection, addDoc } = firestoreFns;
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
    if (!storage || !storageFns || !firestoreFns) {
      console.warn('Firebase not available. File upload skipped.');
      return null;
    }
    try {
      const { ref, uploadBytes, getDownloadURL } = storageFns;
      const { doc, updateDoc } = firestoreFns;
      const fileBuffer = await fs.readFile(localFilePath);
      const fileName = path.basename(localFilePath);
      const fileRef = ref(storage, `reports/${reportId}/${fileName}`);
      const snapshot = await uploadBytes(fileRef, fileBuffer);
      const downloadUrl = await getDownloadURL(snapshot.ref);
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
    if (!db || !firestoreFns) {
      console.warn('Firebase not available. Returning empty reports list.');
      return [];
    }
    try {
      const { getDocs, collection } = firestoreFns;
      const reportsSnapshot = await getDocs(collection(db, 'security-reports'));
      return reportsSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
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
    if (!db || !firestoreFns) {
      throw new Error('Firebase not available');
    }
    try {
      const { getDoc, doc } = firestoreFns;
      const reportDoc = await getDoc(doc(db, 'security-reports', reportId));
      if (reportDoc.exists()) {
        return { id: reportDoc.id, ...reportDoc.data() };
      } else {
        throw new Error(`Report with ID ${reportId} not found`);
      }
    } catch (error) {
      console.error(`Error fetching report ${reportId}:`, error);
      throw error;
    }
  }
}

module.exports = new ReportService();
