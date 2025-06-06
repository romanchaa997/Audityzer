
/**
 * Enhanced Logger Utility
 * Provides structured logging with different levels and formatting
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

class Logger {
  constructor(options = {}) {
    this.level = options.level || 'info';
    this.logFile = options.logFile || null;
    this.enableColors = options.enableColors !== false;
    this.timestamp = options.timestamp !== false;
  }

  _formatMessage(level, message, meta = {}) {
    const timestamp = this.timestamp ? new Date().toISOString() : '';
    const prefix = timestamp ? `[${timestamp}]` : '';
    const levelStr = level.toUpperCase().padEnd(5);
    
    let formattedMessage = `${prefix} ${levelStr} ${message}`;
    
    if (Object.keys(meta).length > 0) {
      formattedMessage += ` ${JSON.stringify(meta)}`;
    }
    
    return formattedMessage;
  }

  _colorize(level, message) {
    if (!this.enableColors) return message;
    
    switch (level) {
      case 'error': return chalk.red(message);
      case 'warn': return chalk.yellow(message);
      case 'info': return chalk.blue(message);
      case 'debug': return chalk.gray(message);
      case 'success': return chalk.green(message);
      default: return message;
    }
  }

  _shouldLog(level) {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.level);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }

  _writeToFile(message) {
    if (this.logFile) {
      try {
        fs.ensureDirSync(path.dirname(this.logFile));
        fs.appendFileSync(this.logFile, message + '\n');
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  _log(level, message, meta = {}) {
    if (!this._shouldLog(level)) return;
    
    const formattedMessage = this._formatMessage(level, message, meta);
    const colorizedMessage = this._colorize(level, formattedMessage);
    
    console.log(colorizedMessage);
    this._writeToFile(formattedMessage);
  }

  error(message, meta = {}) {
    this._log('error', message, meta);
  }

  warn(message, meta = {}) {
    this._log('warn', message, meta);
  }

  info(message, meta = {}) {
    this._log('info', message, meta);
  }

  debug(message, meta = {}) {
    this._log('debug', message, meta);
  }

  success(message, meta = {}) {
    this._log('success', message, meta);
  }
}

// Create default logger instance
const logger = new Logger({
  level: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || null,
  enableColors: process.env.NODE_ENV !== 'production'
});

export default logger;
export { Logger };
