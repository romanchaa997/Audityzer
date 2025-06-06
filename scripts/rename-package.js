#!/usr/bin/env node

/**
 * Audityzer Rename Script
 * 
 * This script automates the process of renaming the package from audityzer to Audityzer,
 * updating relevant file references and configuration.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const oldName = 'audityzer';
const newName = 'audityzer';
const oldDescription = 'Intelligent development server with auto port management for Web3 security testing';
const newDescription = 'Intelligent development server with auto port management for Web3 security testing';

// Files to update
const filesToUpdate = [
  'package.json',
  'package-lock.json',
  'README.md',
  '.github/workflows/ci-cd.yml',
  'bin/audityzer.js'
];

// Directories to search recursively for references
const dirsToSearch = [
  'src',
  'scripts',
  'packages',
  'tests'
];

// Function to update file content
async function updateFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found, skipping: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace references
    let updatedContent = content
      .replace(new RegExp(oldName, 'g'), newName)
      .replace(new RegExp(oldDescription, 'g'), newDescription)
      .replace(/audityzer/g, 'audityzer')
      .replace(/Audityzer/gi, 'Audityzer');
      
    // Special handling for package.json
    if (filePath.endsWith('package.json')) {
      const packageJson = JSON.parse(content);
      
      if (packageJson.name === 'audityzer' || packageJson.name === oldName) {
        packageJson.name = newName;
        packageJson.description = newDescription;
        
        // Update bin if it exists
        if (packageJson.bin) {
          const newBin = {};
          if (packageJson.bin[oldName]) {
            newBin[newName] = packageJson.bin[oldName];
            delete packageJson.bin[oldName];
          }
          if (packageJson.bin.audityzer) {
            newBin[newName] = packageJson.bin.audityzer;
            delete packageJson.bin.audityzer;
          }
          
          // Keep other bin entries
          Object.keys(packageJson.bin).forEach(key => {
            newBin[key] = packageJson.bin[key];
          });
          
          packageJson.bin = newBin;
        }
        
        updatedContent = JSON.stringify(packageJson, null, 2);
      }
    }
    
    // Write changes if content was modified
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to search directory recursively for files to update
async function searchDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        await searchDirectory(fullPath);
      } else if (entry.isFile() && 
                (entry.name.endsWith('.js') || 
                 entry.name.endsWith('.json') || 
                 entry.name.endsWith('.md') || 
                 entry.name.endsWith('.yml'))) {
        await updateFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error searching directory ${dir}:`, error.message);
  }
}

// Main function
async function renamePackage() {
  console.log(`Starting package rename from ${oldName} to ${newName}...`);
  
  // Update specific files first
  for (const file of filesToUpdate) {
    await updateFile(file);
  }
  
  // Search directories recursively
  for (const dir of dirsToSearch) {
    if (fs.existsSync(dir)) {
      await searchDirectory(dir);
    }
  }
  
  // Rename main binary file if needed
  const oldBinPath = path.join('bin', 'audityzer.js');
  const newBinPath = path.join('bin', 'audityzer.js');
  
  if (fs.existsSync(oldBinPath) && !fs.existsSync(newBinPath)) {
    try {
      // Create a symbolic link instead of renaming to maintain backward compatibility
      console.log(`Creating symbolic link from ${oldBinPath} to ${newBinPath}`);
      fs.copyFileSync(oldBinPath, newBinPath);
      
      // Update shebang line
      let binContent = fs.readFileSync(newBinPath, 'utf8');
      binContent = binContent.replace(/audityzer/g, 'audityzer');
      fs.writeFileSync(newBinPath, binContent);
    } catch (error) {
      console.error('Error creating binary symlink:', error.message);
    }
  }
  
  console.log('\nPackage renamed successfully!');
  console.log('\nNext steps:');
  console.log('1. Review changes in the updated files');
  console.log('2. Update any remaining references manually');
  console.log('3. Test the package to ensure everything works correctly');
  console.log('4. Update npm scripts in your package.json to use the new name');
}

// Run the script
renamePackage().catch(error => {
  console.error('Error renaming package:', error);
  process.exit(1);
}); 