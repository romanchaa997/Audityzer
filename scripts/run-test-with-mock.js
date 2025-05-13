/**
 * Run Test With Mock
 *
 * A simple script to run tests with MOCK_MODE=true environment variable set
 */

process.env.MOCK_MODE = 'true';

const { spawnSync } = require('child_process');
const args = process.argv.slice(2);

// Format the command properly based on arguments
let playwrithArgs = ['test'];

// If a specific test file is provided, add it
if (args.some(arg => arg.endsWith('.js') || arg.endsWith('.ts'))) {
  playwrithArgs = playwrithArgs.concat(args);
} else {
  // Otherwise use the default test pattern
  if (args.length > 0) {
    playwrithArgs = playwrithArgs.concat(args);
  }
}

console.log('Running tests with MOCK_MODE=true');
console.log(`Command: npx playwright ${playwrithArgs.join(' ')}`);

const result = spawnSync('npx', ['playwright', ...playwrithArgs], {
  stdio: 'inherit',
  env: { ...process.env, MOCK_MODE: 'true' },
});

process.exit(result.status);
