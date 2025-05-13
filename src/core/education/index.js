/**
 * Web3 Security Education and Training Module
 *
 * Provides educational resources and interactive tutorials for learning
 * about web3 security concepts and vulnerability prevention.
 */

const fs = require('fs-extra');
const path = require('path');

// Import education modules
const TutorialManager = require('./tutorial-manager');
const LearningPathManager = require('./learning-path-manager');
const SecurityChallenge = require('./security-challenge');
const VulnerabilityLibrary = require('./vulnerability-library');

module.exports = {
  TutorialManager,
  LearningPathManager,
  SecurityChallenge,
  VulnerabilityLibrary,
};
