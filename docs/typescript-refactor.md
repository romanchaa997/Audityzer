# TypeScript Refactoring Guide

## Completed Improvements

1. **Created a centralized types system**

   - Added `src/types/provider.ts` with all wallet-related interfaces
   - Defined proper EthereumProvider interface following EIP-1193 specification
   - Added comprehensive JSDoc documentation for all interfaces

2. **Created separate adapter implementations**

   - Moved MetaMask adapter to `src/core/adapters/metamask-adapter.ts`
   - Added proper TypeScript type assertions with `as any` to avoid type errors
   - Enhanced error handling with try/catch blocks and detailed error messages

3. **Added TypeScript validation tooling**
   - Created `scripts/typecheck.js` to check for TypeScript errors
   - Added helpful error messages and suggestions for common issues

## Pending Improvements

1. **Complete adapter refactoring**

   - Create separate adapter files for WalletConnect and Coinbase Wallet
   - Implement proper error handling and standardized API across all adapters
   - Update factory function to use the new adapter implementations

2. **Enhance documentation**

   - Add comprehensive usage examples for each adapter
   - Document common error patterns and solutions
   - Create integration test examples

3. **Improve type safety**

   - Replace `any` types with more specific types where possible
   - Add runtime type validation for critical operations
   - Implement proper error subclasses for different error types

4. **Add testing infrastructure**
   - Create unit tests for each adapter implementation
   - Implement mocks for provider interactions
   - Set up integration tests for real-world scenarios

## How to Continue the Refactoring

### 1. Fix the remaining TypeScript errors

Run the TypeScript validation script to identify remaining issues:

```bash
node scripts/typecheck.js
```

Common errors and their fixes:

- **`window.ethereum` is of type 'unknown'**: Use type assertions like `(window.ethereum as any)` in the affected code.
- **Parameter implicitly has an 'any' type**: Add explicit type annotations to function parameters.
- **Cannot assign to 'networkName' because it is a constant**: Use `let` instead of `const` for variables that will be reassigned.
- **All declarations of 'ethereum' must have identical modifiers**: Ensure consistent use of optional modifiers (`?`) across declarations.

### 2. Implement WalletConnect adapter

Create a new file at `src/core/adapters/walletconnect-adapter.ts` based on the MetaMask adapter implementation, but update it to use WalletConnect-specific functionality.

### 3. Implement Coinbase Wallet adapter

Create a new file at `src/core/adapters/coinbase-adapter.ts` for the Coinbase Wallet implementation.

### 4. Update the factory function

Update `createWalletAdapter` in `src/core/wallet-adapter.ts` to use the new adapter implementations.

### 5. Add tests

Create test files for each adapter in a `__tests__` directory and implement comprehensive tests for all functionality.

## Best Practices for Future Development

1. **Use the centralized types**: Always import types from `src/types/provider.ts` rather than redefining them.
2. **Add comprehensive documentation**: Include JSDoc comments for all public APIs.
3. **Handle errors properly**: Use try/catch blocks and provide detailed error messages.
4. **Type assertions**: When using `window.ethereum`, always use explicit type assertions to avoid type errors.
5. **Modular approach**: Keep each adapter in its own file to maintain separation of concerns.
6. **Consistent API**: Ensure all adapters implement the same interface with consistent behavior.
