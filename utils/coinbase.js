// Alpha plugin: Coinbase provider injection logic (scaffold only)

export function injectCoinbaseProvider(appendToOutput) {
  // TODO: Implement Coinbase provider injection logic here
  const msg = 'Coinbase provider injection logic (scaffold only, alpha plugin)'
  console.log(msg)
  if (typeof appendToOutput === 'function') {
    appendToOutput(`<div class='output-line'>${msg}</div>`)
  }
}
