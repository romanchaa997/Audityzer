# How the Audityzer Project Works

## 🏗️ **Project Structure**

```
Audityzer/
├── src/                    # Source code
├── test/                   # Unit tests
├── tests/                  # Integration tests
├── scripts/                # Utility scripts
├── .vscode/                # VSCode settings
├── package.json            # Project configuration
├── jest.config.js          # Jest test configuration
├── babel.config.json       # Babel transpilation config
├── eslint.config.mjs       # ESLint linting config
└── tsconfig.json           # TypeScript configuration
```

## ⚙️ **Configuration Overview**

### **Package Manager: npm**
- **Primary**: `package-lock.json` (npm lockfile)
- **Cleaned**: `pnpm-lock.yaml` (backed up to prevent conflicts)
- **Setting**: VSCode configured to use npm exclusively

### **Module System: ES Modules**
- **Type**: `"type": "module"` in package.json
- **Syntax**: Uses `import/export` statements
- **Compatibility**: Babel handles transpilation for different environments

### **Testing: Jest + Babel**
- **Framework**: Jest 29.7.0
- **Transpiler**: Babel with ES module support
- **Coverage**: v8 provider with 50% thresholds
- **Files**: Matches `*.test.js` and `*.spec.js` patterns

### **Linting: ESLint**
- **Version**: ESLint 9.28.0
- **Plugins**: TypeScript, React support
- **Config**: Modern flat config format (`.mjs`)

## 🚀 **Available Scripts**

### **Development**
```bash
npm start              # Start the MCP server
npm run dev            # Start with nodemon (auto-restart)
```

### **Testing**
```bash
npm test               # Run all tests
npm run test:basic     # Run basic functionality test
npm run test:runner    # Run test diagnostics
npm run test:setup     # Verify project setup
```

### **Code Quality**
```bash
npm run lint           # Run ESLint
npm run cleanup        # Clean package manager conflicts
```

### **MCP (Model Context Protocol)**
```bash
npm run mcp:start      # Start MCP server
npm run mcp:stop       # Stop MCP server
npm run mcp:restart    # Restart MCP server
npm run mcp:status     # Check MCP status
```

## 🔧 **How Each Component Works**

### **1. Jest Testing System**
```javascript
// jest.config.js - Simplified configuration
export default {
  testEnvironment: 'node',
  transform: { '^.+\\.js$': 'babel-jest' },
  extensionsToTreatAsEsm: ['.js'],
  // ... other settings
};
```

**How it works:**
1. Jest finds test files matching `*.test.js` patterns
2. Babel transpiles ES modules to CommonJS for Jest
3. Tests run in Node.js environment
4. Coverage reports generated in `/coverage` directory

### **2. Babel Transpilation**
```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]],
  "env": {
    "test": {
      "presets": [["@babel/preset-env", { "modules": "commonjs" }]]
    }
  }
}
```

**How it works:**
1. **Production**: Preserves ES modules for modern Node.js
2. **Testing**: Converts to CommonJS for Jest compatibility
3. **Target**: Current Node.js version for optimal performance

### **3. ESLint Code Quality**
```javascript
// eslint.config.mjs
import pluginReact from "eslint-plugin-react";
export default [
  { files: ["**/*.ts", "**/*.tsx"], /* TypeScript rules */ },
  { files: ["**/*.jsx", "**/*.tsx"], /* React rules */ }
];
```

**How it works:**
1. Flat config format (modern ESLint)
2. TypeScript and React plugin support
3. Separate rules for different file types

### **4. Package Manager Conflict Prevention**
```javascript
// scripts/cleanup-lockfiles.js
const lockfiles = ['pnpm-lock.yaml', 'yarn.lock', 'bun.lockb'];
// Automatically cleans conflicting lockfiles
```

**How it works:**
1. Runs automatically after `npm install` (postinstall hook)
2. Backs up conflicting lockfiles before cleaning
3. Maintains npm as the exclusive package manager

## 🎯 **Workflow Examples**

### **Adding a New Test**
1. Create `test/my-feature.test.js`
2. Use ES module syntax:
   ```javascript
   import { myFunction } from '../src/my-module.js';
   
   describe('My Feature', () => {
     test('should work correctly', () => {
       expect(myFunction()).toBe('expected');
     });
   });
   ```
3. Run: `npm test`

### **Adding a New Source File**
1. Create `src/my-module.js`
2. Use ES module exports:
   ```javascript
   export function myFunction() {
     return 'expected';
   }
   
   export default myFunction;
   ```
3. Import in other files:
   ```javascript
   import myFunction, { myFunction as named } from './my-module.js';
   ```

### **Running Diagnostics**
```bash
npm run test:runner    # Check Jest setup
npm run test:setup     # Verify all tools
npm run cleanup        # Fix package conflicts
```

## 🛠️ **Troubleshooting**

### **Jest Issues**
- **Problem**: "Cannot use import statement"
- **Solution**: Check `babel.config.json` test environment settings

### **Package Manager Conflicts**
- **Problem**: Multiple lockfiles detected
- **Solution**: Run `npm run cleanup`

### **ESLint Errors**
- **Problem**: Plugin not found
- **Solution**: Check imports in `eslint.config.mjs`

### **Module Resolution**
- **Problem**: Cannot find module
- **Solution**: Ensure `.js` extensions in import paths

## 📊 **Project Health Checks**

The project includes several health check scripts:

1. **`npm run test:setup`** - Verifies all tools are working
2. **`npm run test:runner`** - Diagnoses Jest configuration
3. **`npm run cleanup`** - Fixes package manager issues
4. **`npm test`** - Runs all tests with coverage

## 🎉 **Success Indicators**

✅ **All tests pass**: `npm test` shows green results  
✅ **No lint errors**: `npm run lint` shows no issues  
✅ **Clean setup**: `npm run test:setup` passes all checks  
✅ **No conflicts**: No package manager warnings in VSCode  

Your Audityzer project is now properly configured and ready for development!