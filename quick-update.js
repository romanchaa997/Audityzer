const fs = require('fs');

// Files to update
const files = [
  'test/core/ai-vulnerability-detection-tests/vulnerability-generator.test.js',
  'test/core/ai-vulnerability-detection-tests/remediation-generator.test.js',
  'test/core/ai-vulnerability-detection-tests/index.test.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

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

    // Handle some() method calls
    content = content.replace(/expect\(([^)]+)\.some\(([^)]+)\)\)\.to\.be\.true/g, 'expect($1.some($2)).toBe(true)');
    content = content.replace(/expect\(([^)]+)\.every\(([^)]+)\)\)\.to\.be\.true/g, 'expect($1.every($2)).toBe(true)');

    // Update sinon stubs to jest mocks
    content = content.replace(/sinon\.stub\(\)\.resolves\(([^)]+)\)/g, 'jest.fn().mockResolvedValue($1)');
    content = content.replace(/\.calledOnce/g, '.toHaveBeenCalledTimes(1)');
    content = content.replace(/expect\(([^)]+)\.calledOnce\)\.to\.be\.true/g, 'expect($1).toHaveBeenCalledTimes(1)');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('All test files updated!');