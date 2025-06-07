const fs = require('fs');
const path = require('path');

class TestTemplateGenerator {
    constructor () {
        this.templateDir = path.join(__dirname, '../../templates');
        this._ensureTemplateDir();
    }

    generateTransactionTest(options = {}) {
        const template = this._loadTemplate('transaction');
        return this._populateTemplate(template, options);
    }

    generateFormTest(options = {}) {
        const template = this._loadTemplate('form');
        return this._populateTemplate(template, options);
    }

    generateClickTest(options = {}) {
        const template = this._loadTemplate('click');
        return this._populateTemplate(template, options);
    }

    saveToFile(content, outputPath) {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(outputPath, content);
        return outputPath;
    }
    
    _loadTemplate(templateName) {
        const templatePath = path.join(this.templateDir, `${templateName}.template.js`);
        
        // If template doesn't exist, create a default one
        if (!fs.existsSync(templatePath)) {
            return this._getDefaultTemplate(templateName);
        }
        
        return fs.readFileSync(templatePath, 'utf8');
    }
    
    _populateTemplate(template, options) {
        let result = template;
        
        // Replace placeholders with values from options
        Object.keys(options).forEach(key => {
            const placeholder = new RegExp(`\{\{${key}\}\}`, 'g');
            result = result.replace(placeholder, options[key]);
        });
        
        return result;
    }
    
    _getDefaultTemplate(templateName) {
        switch(templateName) {
            case 'transaction':
                return `// Generated Transaction Test
const { test, expect } = require('@playwright/test');

test('{{testName}}', async ({ page }) => {
  // Navigate to the page
  await page.goto('{{url}}');
  
  // Connect wallet if needed
  {{#if connectWallet}}
  await page.click('{{connectSelector}}');
  {{/if}}
  
  // Trigger transaction
  await page.click('{{transactionSelector}}');
  
  // Verify transaction was successful
  await expect(page.locator('{{successSelector}}')).toBeVisible();
});
`;
                
            case 'form':
                return `// Generated Form Test
const { test, expect } = require('@playwright/test');

test('{{testName}}', async ({ page }) => {
  // Navigate to the page
  await page.goto('{{url}}');
  
  // Fill the form
  {{#each formFields}}
  await page.fill('{{selector}}', '{{value}}');
  {{/each}}
  
  // Submit the form
  await page.click('{{submitSelector}}');
  
  // Verify submission was successful
  await expect(page.locator('{{successSelector}}')).toBeVisible();
});
`;
                
            case 'click':
                return `// Generated Click Test
const { test, expect } = require('@playwright/test');

test('{{testName}}', async ({ page }) => {
  // Navigate to the page
  await page.goto('{{url}}');
  
  // Perform click action
  await page.click('{{clickSelector}}');
  
  // Verify expected result
  await expect(page.locator('{{resultSelector}}')).toBeVisible();
});
`;
                
            default:
                return `// Generated Test
const { test, expect } = require('@playwright/test');

test('{{testName}}', async ({ page }) => {
  // Navigate to the page
  await page.goto('{{url}}');
  
  // Test implementation goes here
});
`;
        }
    }
    
    _ensureTemplateDir() {
        if (!fs.existsSync(this.templateDir)) {
            fs.mkdirSync(this.templateDir, { recursive: true });
            
            // Create default templates
            const templates = ['transaction', 'form', 'click'];
            templates.forEach(template => {
                const content = this._getDefaultTemplate(template);
                fs.writeFileSync(
                    path.join(this.templateDir, `${template}.template.js`),
                    content
                );
            });
        }
    }
}

module.exports = TestTemplateGenerator;