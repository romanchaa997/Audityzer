// Alpha plugin: WalletConnect provider injection logic

export function injectWalletConnectProvider(appendToOutput) {
  // TODO: Implement WalletConnect injection logic here
  const msg = 'WalletConnect provider injection logic (alpha plugin)'
  console.log(msg)
  if (typeof appendToOutput === 'function') {
    appendToOutput(`<div class='output-line'>${msg}</div>`)
  }
}
