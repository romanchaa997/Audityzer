const fs = require('fs');
const path = require('path');

// Function to update test files from Chai/Sinon to Jest
function updateTestFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove chai and sinon imports
  content = content.replace(/const { expect } = require\('chai'\);\n/, '');
  content = content.replace(/const sinon = require\('sinon'\);\n/, '');

  // Update sinon.restore() to jest.restoreAllMocks()
  content = content.replace(/sinon\.restore\(\)/g, 'jest.restoreAllMocks()');

  // Update expect statements
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.true/g, 'expect($1).toBe(true)');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.false/g, 'expect($1).toBe(false)');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.an?\('object'\)/g, 'expect($1).toEqual(expect.any(Object))');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.an?\('array'\)/g, 'expect($1).toEqual(expect.any(Array))');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.an?\('string'\)/g, 'expect($1).toEqual(expect.any(String))');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.an?\('number'\)/g, 'expect($1).toEqual(expect.any(Number))');
  content = content.replace(/expect\(([^)]+)\)\.to\.equal\(([^)]+)\)/g, 'expect($1).toBe($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.include\(([^)]+)\)/g, 'expect($1).toContain($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.not\.include\(([^)]+)\)/g, 'expect($1).not.toContain($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.have\.property\('([^']+)'\)/g, 'expect($1).toHaveProperty(\'$2\')');
  content = content.replace(/expect\(([^)]+)\)\.to\.not\.have\.property\('([^']+)'\)/g, 'expect($1).not.toHaveProperty(\'$2\')');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.at\.least\(([^)]+)\)/g, 'expect($1).toBeGreaterThanOrEqual($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.at\.most\(([^)]+)\)/g, 'expect($1).toBeLessThanOrEqual($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.greaterThan\(([^)]+)\)/g, 'expect($1).toBeGreaterThan($2)');
  content = content.replace(/expect\(([^)]+)\)\.to\.be\.lessThan\(([^)]+)\)/g, 'expect($1).toBeLessThan($2)');
  content = content.replace(/expect\(([^)]+)\)\.length\.to\.equal\(([^)]+)\)/g, 'expect($1.length).toBe($2)');
  content = content.replace(/expect\(([^)]+)\.length\)\.to\.equal\(([^)]+)\)/g, 'expect($1.length).toBe($2)');
  content = content.replace(/expect\(([^)]+)\.length\)\.to\.be\.greaterThan\(([^)]+)\)/g, 'expect($1.length).toBeGreaterThan($2)');

  // Update sinon stubs to jest mocks
  content = content.replace(/sinon\.stub\(\)\.resolves\(([^)]+)\)/g, 'jest.fn().mockResolvedValue($1)');
  content = content.replace(/\.calledOnce/g, '.toHaveBeenCalledTimes(1)');
  content = content.replace(/expect\(([^)]+)\.calledOnce\)\.to\.be\.true/g, 'expect($1).toHaveBeenCalledTimes(1)');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

// Update all test files
const testDir = path.join(__dirname, 'test/core/ai-vulnerability-detection-tests');
const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.test.js'));

testFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  updateTestFile(filePath);
});

console.log('All test files updated!');