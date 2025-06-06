/**
 * AI Vulnerability Detection Model Interface
 *
 * Provides a standardized interface for connecting to various AI models
 * for smart contract and DApp vulnerability detection.
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class AIModelInterface {
  /**
   * Initialize the AI model interface
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      modelProvider: options.modelProvider || 'openai',
      modelName: options.modelName || 'gpt-4',
      apiKey: options.apiKey || process.env.OPENAI_API_KEY,
      embeddingModel: options.embeddingModel || 'text-embedding-ada-002',
      maxTokens: options.maxTokens || 2048,
      temperature: options.temperature || 0.1,
      cacheDir: options.cacheDir || './.cache/ai-models',
      timeout: options.timeout || 60000,
      huggingFaceEndpoint:
        options.huggingFaceEndpoint || 'https://api-inference.huggingface.co/models',
      huggingFaceApiKey: options.huggingFaceApiKey || process.env.HUGGINGFACE_API_KEY,
      useLocalModel: options.useLocalModel || false,
      localModelPath: options.localModelPath || './models/vulnerability-detection',
      defaultPromptTemplate: options.defaultPromptTemplate || 'smartContractAudit',
      ...options,
    };

    // Create cache directory if it doesn't exist
    fs.ensureDirSync(this.options.cacheDir);

    // Load prompt templates
    this.promptTemplates = this._loadPromptTemplates();

    // Initialize the appropriate model client
    this.client = this._initializeClient();
  }

  /**
   * Load prompt templates from files
   * @private
   * @returns {Object} Prompt templates
   */
  _loadPromptTemplates() {
    const templatesDir = path.join(__dirname, 'prompts');
    const templates = {};

    // Create templates directory if it doesn't exist
    fs.ensureDirSync(templatesDir);

    // Default templates if none exist
    const defaultTemplates = {
      smartContractAudit: `You are a smart contract security auditor analyzing the following code for vulnerabilities.
Focus on: reentrancy, access control issues, integer overflow/underflow, logic errors, and gas optimization.
Format your response as a JSON object with the following structure:
{
  "vulnerabilities": [
    {
      "type": "string", // vulnerability type
      "severity": "Critical|High|Medium|Low|Informational",
      "description": "string", // detailed description
      "location": "string", // file and line numbers
      "code_snippet": "string", // relevant code snippet
      "recommendation": "string" // how to fix it
    }
  ],
  "summary": "string" // overall security assessment
}

Code to analyze:
`,
      dappAnalysis: `Analyze the following DApp code for Web3 security vulnerabilities.
Focus on: front-running, wallet integration issues, improper transaction handling, signature verification, and user interface security.
Format your response as a JSON object with the following structure:
{
  "vulnerabilities": [
    {
      "type": "string", // vulnerability type
      "severity": "Critical|High|Medium|Low|Informational",
      "description": "string", // detailed description
      "location": "string", // file and line numbers
      "code_snippet": "string", // relevant code snippet
      "recommendation": "string" // how to fix it
    }
  ],
  "summary": "string" // overall security assessment
}

Code to analyze:
`,
      bridgeSecurity: `Analyze the following bridge-related smart contract code for security vulnerabilities.
Focus on: cross-chain replay attacks, fund lockup, oracle manipulation, insufficient validation, and improper event handling.
Format your response as a JSON object with the following structure:
{
  "vulnerabilities": [
    {
      "type": "string", // vulnerability type
      "severity": "Critical|High|Medium|Low|Informational",
      "description": "string", // detailed description
      "location": "string", // file and line numbers
      "code_snippet": "string", // relevant code snippet
      "recommendation": "string" // how to fix it
    }
  ],
  "summary": "string" // overall security assessment
}

Code to analyze:
`,
    };

    // Save default templates if they don't exist
    for (const [name, content] of Object.entries(defaultTemplates)) {
      const templatePath = path.join(templatesDir, `${name}.txt`);
      if (!fs.existsSync(templatePath)) {
        fs.writeFileSync(templatePath, content);
      }
    }

    // Load all template files
    const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.txt'));
    for (const file of templateFiles) {
      const templateName = path.basename(file, '.txt');
      templates[templateName] = fs.readFileSync(path.join(templatesDir, file), 'utf8');
    }

    return templates;
  }

  /**
   * Initialize the appropriate model client
   * @private
   * @returns {Object} Model client
   */
  _initializeClient() {
    if (this.options.useLocalModel) {
      return this._initializeLocalModel();
    }

    switch (this.options.modelProvider.toLowerCase()) {
      case 'openai':
        return this._initializeOpenAI();
      case 'huggingface':
        return this._initializeHuggingFace();
      case 'anthropic':
        return this._initializeAnthropic();
      case 'local':
        return this._initializeLocalModel();
      default:
        throw new Error(`Unsupported model provider: ${this.options.modelProvider}`);
    }
  }

  /**
   * Initialize the OpenAI client
   * @private
   * @returns {Object} OpenAI client
   */
  _initializeOpenAI() {
    if (!this.options.apiKey) {
      throw new Error(
        'OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass it in options.'
      );
    }

    return {
      async analyze(prompt, options = {}) {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: options.modelName || 'gpt-4',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: options.maxTokens || 2048,
              temperature: options.temperature || 0.1,
            },
            {
              headers: {
                Authorization: `Bearer ${options.apiKey}`,
                'Content-Type': 'application/json',
              },
              timeout: options.timeout || 60000,
            }
          );

          return response.data.choices[0].message.content;
        } catch (error) {
          if (error.response) {
            throw new Error(
              `OpenAI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            throw new Error(`OpenAI API request error: ${error.message}`);
          } else {
            throw new Error(`OpenAI API error: ${error.message}`);
          }
        }
      },

      async generateEmbeddings(text, options = {}) {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
              model: options.embeddingModel || 'text-embedding-ada-002',
              input: text,
            },
            {
              headers: {
                Authorization: `Bearer ${options.apiKey}`,
                'Content-Type': 'application/json',
              },
              timeout: options.timeout || 30000,
            }
          );

          return response.data.data[0].embedding;
        } catch (error) {
          if (error.response) {
            throw new Error(
              `OpenAI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            throw new Error(`OpenAI API request error: ${error.message}`);
          } else {
            throw new Error(`OpenAI API error: ${error.message}`);
          }
        }
      },
    };
  }

  /**
   * Initialize the Hugging Face client
   * @private
   * @returns {Object} Hugging Face client
   */
  _initializeHuggingFace() {
    if (!this.options.huggingFaceApiKey) {
      throw new Error(
        'Hugging Face API key is required. Set HUGGINGFACE_API_KEY environment variable or pass it in options.'
      );
    }

    return {
      async analyze(prompt, options = {}) {
        try {
          const response = await axios.post(
            `${options.huggingFaceEndpoint}/${options.modelName}`,
            {
              inputs: prompt,
              parameters: {
                max_length: options.maxTokens || 2048,
                temperature: options.temperature || 0.1,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${options.huggingFaceApiKey}`,
                'Content-Type': 'application/json',
              },
              timeout: options.timeout || 60000,
            }
          );

          return response.data[0].generated_text;
        } catch (error) {
          if (error.response) {
            throw new Error(
              `Hugging Face API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            throw new Error(`Hugging Face API request error: ${error.message}`);
          } else {
            throw new Error(`Hugging Face API error: ${error.message}`);
          }
        }
      },

      async generateEmbeddings(text, options = {}) {
        try {
          const embeddingModel =
            options.embeddingModel || 'sentence-transformers/all-mpnet-base-v2';

          const response = await axios.post(
            `${options.huggingFaceEndpoint}/${embeddingModel}`,
            {
              inputs: text,
            },
            {
              headers: {
                Authorization: `Bearer ${options.huggingFaceApiKey}`,
                'Content-Type': 'application/json',
              },
              timeout: options.timeout || 30000,
            }
          );

          return response.data;
        } catch (error) {
          if (error.response) {
            throw new Error(
              `Hugging Face API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            throw new Error(`Hugging Face API request error: ${error.message}`);
          } else {
            throw new Error(`Hugging Face API error: ${error.message}`);
          }
        }
      },
    };
  }

  /**
   * Initialize the Anthropic client
   * @private
   * @returns {Object} Anthropic client
   */
  _initializeAnthropic() {
    if (!this.options.apiKey) {
      throw new Error(
        'Anthropic API key is required. Set ANTHROPIC_API_KEY environment variable or pass it in options.'
      );
    }

    return {
      async analyze(prompt, options = {}) {
        try {
          const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
              model: options.modelName || 'claude-2',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: options.maxTokens || 2048,
            },
            {
              headers: {
                'x-api-key': options.apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01',
              },
              timeout: options.timeout || 60000,
            }
          );

          return response.data.content;
        } catch (error) {
          if (error.response) {
            throw new Error(
              `Anthropic API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            throw new Error(`Anthropic API request error: ${error.message}`);
          } else {
            throw new Error(`Anthropic API error: ${error.message}`);
          }
        }
      },
    };
  }

  /**
   * Initialize the local model client
   * @private
   * @returns {Object} Local model client
   */
  _initializeLocalModel() {
    if (!fs.existsSync(this.options.localModelPath)) {
      throw new Error(`Local model path does not exist: ${this.options.localModelPath}`);
    }

    return {
      async analyze(prompt, options = {}) {
        try {
          // Create a temporary file with the prompt
          const promptFile = path.join(options.cacheDir, `prompt-${Date.now()}.txt`);
          fs.writeFileSync(promptFile, prompt);

          // Run the local model
          const outputFile = path.join(options.cacheDir, `output-${Date.now()}.txt`);
          const command = `python ${path.join(options.localModelPath, 'run_model.py')} --input "${promptFile}" --output "${outputFile}" --model "${options.modelName}" --max-tokens ${options.maxTokens} --temperature ${options.temperature}`;

          await execPromise(command);

          // Read the output
          const output = fs.readFileSync(outputFile, 'utf8');

          // Clean up temporary files
          fs.removeSync(promptFile);
          fs.removeSync(outputFile);

          return output;
        } catch (error) {
          throw new Error(`Local model error: ${error.message}`);
        }
      },
    };
  }

  /**
   * Analyze code for vulnerabilities
   * @param {string} code - Code to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeCode(code, options = {}) {
    try {
      // Get the prompt template
      const templateName = options.promptTemplate || this.options.defaultPromptTemplate;
      const template = this.promptTemplates[templateName];

      if (!template) {
        throw new Error(`Prompt template not found: ${templateName}`);
      }

      // Create the prompt
      const prompt = `${template}\n${code}`;

      // Analyze the code
      const result = await this.client.analyze(prompt, {
        ...this.options,
        ...options,
      });

      // Parse the result
      try {
        // Extract JSON from the result (it might contain additional text)
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON object found in the result');
        }

        const parsedResult = JSON.parse(jsonMatch[0]);
        return parsedResult;
      } catch (parseError) {
        console.warn('Failed to parse JSON result:', parseError.message);
        // Return raw result if parsing fails
        return {
          raw: result,
          error: parseError.message,
          vulnerabilities: [],
        };
      }
    } catch (error) {
      console.error('AI model analysis error:', error);
      throw error;
    }
  }

  /**
   * Get available prompt templates
   * @returns {string[]} Template names
   */
  getAvailableTemplates() {
    return Object.keys(this.promptTemplates);
  }

  /**
   * Add a new prompt template
   * @param {string} name - Template name
   * @param {string} content - Template content
   * @param {boolean} persist - Whether to persist the template to disk
   * @returns {boolean} Success
   */
  addPromptTemplate(name, content, persist = true) {
    try {
      this.promptTemplates[name] = content;

      if (persist) {
        const templatesDir = path.join(__dirname, 'prompts');
        fs.ensureDirSync(templatesDir);
        fs.writeFileSync(path.join(templatesDir, `${name}.txt`), content);
      }

      return true;
    } catch (error) {
      console.error('Error adding prompt template:', error);
      return false;
    }
  }

  /**
   * Delete a prompt template
   * @param {string} name - Template name
   * @param {boolean} persist - Whether to delete the template from disk
   * @returns {boolean} Success
   */
  deletePromptTemplate(name, persist = true) {
    try {
      if (!this.promptTemplates[name]) {
        return false;
      }

      delete this.promptTemplates[name];

      if (persist) {
        const templatesDir = path.join(__dirname, 'prompts');
        const templatePath = path.join(templatesDir, `${name}.txt`);

        if (fs.existsSync(templatePath)) {
          fs.unlinkSync(templatePath);
        }
      }

      return true;
    } catch (error) {
      console.error('Error deleting prompt template:', error);
      return false;
    }
  }

  /**
   * Generate embeddings for text
   * @param {string} text - Text to generate embeddings for
   * @param {Object} options - Embedding options
   * @returns {Promise<number[]>} Embeddings
   */
  async generateEmbeddings(text, options = {}) {
    if (!this.client.generateEmbeddings) {
      throw new Error(`Embeddings not supported for ${this.options.modelProvider} provider`);
    }

    return await this.client.generateEmbeddings(text, {
      ...this.options,
      ...options,
    });
  }
}

module.exports = AIModelInterface;
