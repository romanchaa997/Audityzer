document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const outputElement = document.getElementById('output');
  const terminalContent = document.getElementById('terminal-content');

  // Dictionary of available commands and their implementations
  const commands = {
    help: () => {
      return `
<div class="output-line success">Available commands:</div>
<div class="output-line">
  <span class="cmd">help</span> - Display this help information
</div>
<div class="output-line">
  <span class="cmd">clear</span> - Clear the terminal
</div>
<div class="output-line">
  <span class="cmd">create &lt;template&gt; [options]</span> - Create a new test template
  <div style="padding-left: 20px;">
    Options:
    <div style="padding-left: 20px;">
      --type=&lt;type&gt; - Type of test (connect, tx, sign)
      --lang=&lt;lang&gt; - Language (js, ts)
      --provider=&lt;provider&gt; - Provider (metamask, walletconnect, coinbase)
    </div>
  </div>
</div>
<div class="output-line">
  <span class="cmd">list [templates|presets]</span> - List available templates or presets
</div>
<div class="output-line">
  <span class="cmd">run &lt;testfile&gt; [options]</span> - Run a test
  <div style="padding-left: 20px;">
    Options:
    <div style="padding-left: 20px;">
      --headed - Run in headed mode
      --debug - Run in debug mode
    </div>
  </div>
</div>
<div class="output-line">
  <span class="cmd">version</span> - Display version information
</div>`;
    },

    clear: () => {
      outputElement.innerHTML = '';
      return '';
    },

    version: () => {
      return '<div class="output-line"><span class="highlight">Web3FuzzForge v1.1.0</span></div>';
    },

    create: async args => {
      if (!args.length) {
        return `<div class="output-line error">Error: Missing template type.</div>
<div class="output-line">Usage: create &lt;template&gt; [options]</div>
<div class="output-line">Type 'help' for more information.</div>`;
      }

      const templateType = args[0];
      const validTemplateTypes = ['connect', 'tx', 'sign', 'security'];

      if (!validTemplateTypes.includes(templateType)) {
        return `<div class="output-line error">Error: Invalid template type '${templateType}'.</div>
<div class="output-line">Valid types: ${validTemplateTypes.join(', ')}</div>`;
      }

      // Parse options
      const options = {
        lang: 'js',
        provider: 'metamask',
      };

      args.slice(1).forEach(arg => {
        if (arg.startsWith('--lang=')) {
          options.lang = arg.split('=')[1];
        } else if (arg.startsWith('--provider=')) {
          options.provider = arg.split('=')[1];
        }
      });

      // Validate options
      const validLangs = ['js', 'ts'];
      const validProviders = ['metamask', 'walletconnect', 'coinbase', 'phantom'];

      if (!validLangs.includes(options.lang)) {
        return `<div class="output-line error">Error: Invalid language '${options.lang}'.</div>
<div class="output-line">Valid languages: ${validLangs.join(', ')}</div>`;
      }

      if (!validProviders.includes(options.provider)) {
        return `<div class="output-line error">Error: Invalid provider '${options.provider}'.</div>
<div class="output-line">Valid providers: ${validProviders.join(', ')}</div>`;
      }

      // Alpha plugin support: dynamically load provider plugin for walletconnect/coinbase
      if (['walletconnect', 'coinbase'].includes(options.provider)) {
        try {
          const { loadProviderPlugin } = await import('../../../utils/providerLoader.js');
          const plugin = await loadProviderPlugin(options.provider);
          if (options.provider === 'walletconnect') {
            plugin.injectWalletConnectProvider(appendToOutput);
          } else if (options.provider === 'coinbase') {
            plugin.injectCoinbaseProvider(appendToOutput);
          }
          // In the future, real logic for file generation or injection will go here
        } catch (e) {
          return `<div class='output-line error'>Error loading provider plugin: ${e.message}</div>`;
        }
      }

      // Simulate creating a template file
      const fileName = `${options.provider}-${templateType}.${options.lang}`;

      return `<div class="output-line success">Creating ${templateType} test template with ${options.provider} provider in ${options.lang}...</div>
<div class="output-line success">✓ Generated file: <span class="highlight">tests/${fileName}</span></div>
<div class="output-line">
  You can run your test with: <span class="cmd">run tests/${fileName}</span>
</div>`;
    },

    list: args => {
      const listType = args[0] || 'templates';

      if (listType === 'templates') {
        return `<div class="output-line success">Available templates:</div>
<div class="output-line">
  <span class="cmd">connect</span> - Wallet connection testing template
</div>
<div class="output-line">
  <span class="cmd">tx</span> - Transaction flow testing template
</div>
<div class="output-line">
  <span class="cmd">sign</span> - Message signing testing template
</div>
<div class="output-line">
  <span class="cmd">security</span> - Security vulnerability testing template (reentrancy, signature spoofing, error handling)
</div>`;
      } else if (listType === 'presets') {
        return `<div class="output-line success">Available presets:</div>
<div class="output-line">
  <span class="cmd">basic-security</span> - Basic security testing preset
</div>
<div class="output-line">
  <span class="cmd">full-security</span> - Comprehensive security testing preset
</div>
<div class="output-line">
  <span class="cmd">fuzzing</span> - Fuzzing-focused testing preset
</div>`;
      } else {
        return `<div class="output-line error">Error: Invalid list type '${listType}'.</div>
<div class="output-line">Valid list types: templates, presets</div>`;
      }
    },

    run: args => {
      if (!args.length) {
        return `<div class="output-line error">Error: Missing test file.</div>
<div class="output-line">Usage: run &lt;testfile&gt; [options]</div>`;
      }

      const testFile = args[0];
      const isHeaded = args.includes('--headed');
      const isDebug = args.includes('--debug');

      // Simulate running a test
      setTimeout(() => {
        appendToOutput('<div class="output-line">Running Playwright...</div>');
      }, 500);

      setTimeout(() => {
        appendToOutput(`<div class="output-line">
  <span class="success">✓</span> Browser initialized
</div>`);
      }, 1200);

      setTimeout(() => {
        appendToOutput(`<div class="output-line">
  <span class="success">✓</span> Connected to wallet
</div>`);
      }, 2000);

      setTimeout(() => {
        appendToOutput(`<div class="output-line success">
  Test completed successfully!
</div>`);
      }, 3000);

      const options = [];
      if (isHeaded) options.push('headed mode');
      if (isDebug) options.push('debug mode');

      return `<div class="output-line">Starting test: <span class="highlight">${testFile}</span>${options.length ? ' with ' + options.join(', ') : ''}</div>`;
    },
  };

  // Function to append content to the terminal output
  function appendToOutput(content) {
    outputElement.innerHTML += content;
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  // Function to process a command
  async function processCommand(commandText) {
    const args = commandText.trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if (cmd === '') {
      return;
    }

    appendToOutput(`<div class="output-line"><span class="prompt">$</span> ${commandText}</div>`);

    if (commands[cmd]) {
      const output = await commands[cmd](args);
      appendToOutput(output);
    } else {
      appendToOutput(`<div class="output-line error">Command not found: ${cmd}</div>
<div class="output-line">Type 'help' for available commands.</div>`);
    }
  }

  // Event listener for terminal input
  terminalInput.addEventListener('keydown', async e => {
    if (e.key === 'Enter') {
      const commandText = terminalInput.value;
      await processCommand(commandText);
      terminalInput.value = '';

      // Scroll to the bottom of the terminal
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  });

  // Terminal UI controls (minimize, maximize, close)
  document.querySelector('.minimize').addEventListener('click', () => {
    const terminal = document.querySelector('.terminal');
    terminal.style.height = terminal.style.height === '40px' ? '100%' : '40px';
  });

  document.querySelector('.maximize').addEventListener('click', () => {
    const playground = document.querySelector('.playground');
    playground.style.gridTemplateColumns =
      playground.style.gridTemplateColumns === '1fr' ? '2fr 1fr' : '1fr';
  });

  document.querySelector('.close').addEventListener('click', () => {
    const terminal = document.querySelector('.terminal');
    terminal.style.display = terminal.style.display === 'none' ? 'flex' : 'none';
  });

  // Focus the terminal input when clicking anywhere in the terminal content
  terminalContent.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Auto-focus on input on page load
  terminalInput.focus();
});
