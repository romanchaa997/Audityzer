// Alpha plugin loader for wallet providers (browser-compatible, ESM style)

export async function loadProviderPlugin(provider) {
  switch (provider) {
    case 'walletconnect':
      return await import('./walletconnect.js')
    case 'coinbase':
      return await import('./coinbase.js')
    case 'phantom':
      return await import('./phantom.js') // Note: This file needs to be created
    case 'rabby':
      return await import('./rabby.js') // Note: This file needs to be created
    // Add more providers as needed
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}

module.exports = {
  loadProviderPlugin,
}
