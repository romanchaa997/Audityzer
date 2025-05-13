#!/usr/bin/env node

/*
 * generate-launch-blog.js
 * Generates a launch blog markdown file using basic project metadata.
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const BLOG_DIR = path.join(__dirname, '..', 'docs', 'blog');
const OUT_FILE = path.join(BLOG_DIR, 'launch.md');

if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

const today = new Date().toISOString().split('T')[0];

const content = `---
slug: devforge-launch
title: 🚀 Introducing DevForge v${pkg.version}
authors: YourName
publish_date: ${today}
---

> DevForge is an intelligent development server built for modern Web3 security testing workflows. Today we are thrilled to release **v${pkg.version}**.

## Why DevForge?

Traditional dev-servers make you babysit ports, SSL, and build steps. DevForge automates all of that and adds security-first instrumentation: smart port allocation, integrated Playwright & Lighthouse drivers, and first-class support for EVM tool-chains.

## Key Features

- ⚡ **One-command start**: \`npx devforge dev\` starts a ready-to-hack environment.
- 🛡️ **Security tests on save**: vulnerability suites run automatically.
- 🌐 **Cross-platform**: works on Windows, macOS, Linux & Docker.
- 📈 **Lighthouse CI**: built-in Lighthouse regression.

## Quickstart

\`\`\`bash
npm install --global devforge

# Launch demo project
npx devforge dev
\`\`\`

## What's next

In the coming weeks we will roll out:

1. Plug-in marketplace
2. zkApps template pack
3. Community dashboards

## Thank you!

This release would not be possible without our amazing contributors and early testers. Join us on GitHub Sponsors to shape the future of secure development.
`;

fs.writeFileSync(OUT_FILE, content);
console.log('✔ Launch blog created at', OUT_FILE); 