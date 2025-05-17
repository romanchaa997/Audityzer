## Audityzer Demo Script

### Intro (20 sec)

- "Hi, I'm going to show you Audityzer, a CLI tool for generating Web3 testing templates"
- "The tool helps automate wallet interactions, transactions, and signing"

### CLI Demo (50 sec)

1. Show basic command:

```bash
Audityzer generate connect --provider metamask --out ./tests/connection.test.js
```

2. Show TypeScript support:

```bash
Audityzer generate tx --provider metamask --out ./tests/transaction.test.ts --typescript
```

3. Show preset configuration:

```bash
Audityzer generate tx --preset defi --out ./tests/defi-swap-test.js
```

4. Explain how `--preset` flag works with different application types

### Config and Mocks (40 sec)

1. Show the `.Audityzer.json` config file and explain how it provides defaults
2. Show one of the provider templates (metamask-connection.tpl)
3. Explain wallet mock functionality:
   - Injection of mock wallets
   - State saving/restoring
   - Transaction simulation

### Test Execution (10 sec)

- Run a sample test with: `npm run test:headed`

### Closing (10 sec)

- Summarize key benefits: security testing, automation, multiple wallet support
- "Thanks for watching this quick demo of Audityzer!"
