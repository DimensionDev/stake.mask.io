import { chains } from '../configs/wagmiClient'

export function resolveTxLink(chainId: number, hash: string) {
  const chain = chains.find((x) => x.id === chainId)
  if (!chain) return ''
  return `${chain.blockExplorers.default.url}/tx/${hash}`
}
