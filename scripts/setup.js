const { execSync } = require('child_process');

function run(cmd, desc) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error during: ${desc}`);
    process.exit(1);
  }
}

run('npm install --legacy-peer-deps', 'Installing dependencies');
run('npm run lint:autofix', 'Running lint auto-fix');
run('npm test', 'Running tests');

