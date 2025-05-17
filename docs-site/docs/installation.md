---
sidebar_position: 2
---

# Installation

Getting started with Audityzer is straightforward. The tool is distributed via npm and can be installed globally or used with npx.

## Global Installation

For the best experience, install Audityzer globally:

```bash
npm install -g Audityzer
```

This makes the `Audityzer` command available anywhere in your terminal.

## Project-Specific Installation

If you prefer to install it as a development dependency in your project:

```bash
npm install --save-dev Audityzer
```

Then you can use it in your npm scripts or with npx:

```bash
npx Audityzer <command>
```

## Prerequisites

Audityzer requires:

- Node.js 16 or later
- npm 7 or later
- For running tests: Playwright installed (`npm install -g playwright`)

For optimal use with the AI configuration feature, you'll also need:

- An OpenAI API key (for the `ask` command)

## Setting Up for AI Features

1. Create a `.env` file in your project root based on the provided `.env-example`
2. Add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Verifying Installation

After installation, verify that everything is working correctly:

```bash
Audityzer --version
```

This should display the current version of Audityzer.

## Next Steps

Once installed, head to the [Quickstart](quickstart) guide to generate your first test template.
