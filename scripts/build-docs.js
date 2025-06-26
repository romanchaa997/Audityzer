
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Building documentation...');

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, '..', 'docs-site', 'build');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Copy README and other documentation files
const sourceFiles = [
  { src: 'README.md', dest: 'index.html' },
  { src: 'CONTRIBUTING.md', dest: 'contributing.html' },
  { src: 'SECURITY.md', dest: 'security.html' }
];

sourceFiles.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(docsDir, dest);
  
  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf8');
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Audityzer Documentation</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
    code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
    fs.writeFileSync(destPath, htmlContent);
    console.log(`✅ Built ${dest}`);
  }
});

console.log('Documentation built successfully');
