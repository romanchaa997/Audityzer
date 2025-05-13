#!/usr/bin/env node

const reportService = require('./core/services/report-service').default;
const { app, db, auth, storage } = require('./core/services/firebase');

// Export the Firebase app and services
module.exports = {
  app,
  db,
  auth,
  storage,
  reportService,
  
  // Additional exports for main functionality 
  generateReport: async (reportData, format = 'html') => {
    console.log('Generating security report...');
    
    try {
      const reportId = await reportService.saveReport({
        ...reportData,
        format,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: true,
        reportId,
        message: `Report generated successfully with ID: ${reportId}`
      };
    } catch (error) {
      console.error('Error generating report:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  
  // Main function for CLI
  main: async () => {
    // Main CLI logic would go here
    console.log('Audityzer - Web3 Security Analysis Toolkit');
    console.log('Run "audityzer --help" for usage information.');
  }
};

// Run main if this script is executed directly
if (require.main === module) {
  module.exports.main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}
