const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.resolve(__dirname, '../darkforest-v0.6/packages');
const mainProjectDir = path.resolve(__dirname, '../');

function run(cmd, cwd) {
  console.log(`\n> Running: ${cmd} in ${cwd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

function bootstrapPackages() {
  const packages = fs.readdirSync(packagesDir).filter(name => {
    const fullPath = path.join(packagesDir, name);
    return (
      fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'package.json'))
    );
  });

  for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg);
    run('npm install --legacy-peer-deps', pkgPath);
    run('npm run build', pkgPath);
    // Optionally link each package globally
    run('npm link', pkgPath);
  }

  // Link all packages in the main project
  for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg);
    run(`npm link ${require(path.join(pkgPath, 'package.json')).name}`, mainProjectDir);
  }

  console.log('\nAll packages bootstrapped, built, and linked!');
}

bootstrapPackages();
