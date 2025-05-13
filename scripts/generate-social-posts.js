#!/usr/bin/env node

/*
 * generate-social-posts.js
 * Generates social media post templates using project info & UTM links.
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const DIST_DIR = path.join(__dirname, '..', 'dist', 'social');
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

const url = `https://github.com/${pkg.repository.url.replace(/^.*github.com\//, '').replace(/\.git$/, '')}`;
const utm = `${url}?utm_source=twitter&utm_medium=social&utm_campaign=launch`;

// Twitter Thread (simple two-tweet thread)
const twitter = [
  `🚀 Introducing DevForge v${pkg.version}!\n\nAn intelligent dev server 🔒 built for Web3 security testing.\n\nZero-config → smart port management → integrated Playwright & Lighthouse CI.\n\n${utm} #Web3 #DevOps #Security`,
  `Why DevForge?\n• Auto-detects port conflicts\n• Runs security tests on every save\n• Cross-platform (Win/Mac/Linux)\n\nGive it a spin: npm i -g devforge && devforge dev\n\n${utm}`
].join('\n\n---\n\n');

// LinkedIn post
const linkedin = `🚀 We just launched DevForge v${pkg.version} – an intelligent development server engineered for Web3 security testing.\n\nHighlights:\n• Automatic port conflict resolution\n• Built-in Playwright & Lighthouse testing\n• Cross-platform & Docker-ready\n\nTry it today 👉 npm i -g devforge\n\n${utm}`;

// Reddit post
const reddit = `Title: [Launch] DevForge – An intelligent dev server for Web3 security testing\n\nBody:\nHey r/webdev & r/ethereum!\n\nWe just open-sourced DevForge v${pkg.version}. It auto-manages ports, injects security testing hooks, & bundles Lighthouse CI out-of-the-box. Looking for feedback from power users – all constructive criticism welcome!\n\nSource & docs: ${url}\n\nCheers!`;

fs.writeFileSync(path.join(DIST_DIR, 'twitter-thread.txt'), twitter);
fs.writeFileSync(path.join(DIST_DIR, 'linkedin.txt'), linkedin);
fs.writeFileSync(path.join(DIST_DIR, 'reddit.txt'), reddit);

console.log('✔ Social posts created in', DIST_DIR); 