import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'markdown-to-jsx'
import { Box, Center, Flex } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaqsToc } from '../components/FaqsToc.tsx'

const FaqsPage = () => {
  const content = `## **Wallet**

### What is MetaMask?

Metamask is a popular browser extension/plugin that functions as an Ethereum wallet. It can be installed like any other browser extension and it allows you to store Ethereum, ERC20, and ERC 721 tokens. Metamask allows users to interact with a vast amount of decentralized applications inside the Ethereum ecosystem without the need to download the whole blockchain on the device.

### What is WalletConnect?

WalletConnect is an open-source protocol that allows your wallet to connect and interact with DApps and other wallets. By scanning a QR code or clicking a deep link, WalletConnect establishes an encrypted connection between your wallet and the DApp. The protocol also has push notification capabilities to notify users of incoming transactions.

### What is Mask Network Wallet?

An unhosted, open-source multi-chain wallet supporting 13 major EVM chains, providing a comprehensive suite of on-chain encrypted services. It includes a one-stop display for all assets across chains, fast, low-slippage swap services, and future integration of various dApp gateways.

EVM chains support list: ETH, BNB chain, Polygon, Arbitrum, Gnosis, Scroll, Aurora, Conflux, Astar, Fantom, Optimism, Base

### Other Wallets

You may also connect with other wallets, such as following:

1. **Fortmatic (Magic)**
  1. Fortmatic (Magic) is a hot wallet, which enables users to use decentralized apps and access tokens from their address on Ethereum. Rather than Extensions or seed phrases, it uses either a phone number or email address for authentication.
  2. [![img](https://fortmatic.com/favicon-16x16.png)Fortmatic - Build web3 dApps without extensions or downloads](https://fortmatic.com/)
2. **Blocto**
  1. Blocto is an All-in-one cross-chain smart contract wallet with a seamless unified experience in one all encompassing platform: Dev-friendly SDK, built-in DEX BloctoSwap, and non-custodial NFT marketplace BloctoBay.
  2. [![img](https://blocto.io/favicon-32x32.png)Blocto | Smooth, secure, gas-saving account abstraction wallet](https://blocto.io/)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Blocto: Crypto Wallet & NFTs - Apps on Google Play](https://play.google.com/store/apps/details?id=com.portto.blocto&utm_source=blocto&utm_medium=official+website) 
3. **Clover**
  1. CLV Wallet is an open-source multi-currency wallet that lives in your browser. Interact with cross-chain DeFi applications without needing to switch between networks in an all-in-one streamlined interface. Send, receive, wrap, and unwrap cross-chain assets across Ethereum, Polkadot, and Binance Smart Chain.
  2. [![img](https://wallet.clover.finance/favicon.ico)Clover Wallet](https://wallet.clover.finance/#/) 
  3. https://chromewebstore.google.com/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk Extension
4. **Bitget Wallet**
  1. Bitget Wallet is the ultimate Web3 multi-chain wallet, offering a comprehensive platform with wallet, Swap, NFT Market, DApp Browser, and Launchpad functionality. Supporting 100+ public chains, Bitget Wallet aggregates top DEXes and NFT markets to provide users with the best trading prices.
  2. [![img](https://web3.bitget.com/favicon.png)Bitget Wallet — Your Web3 Trading Wallet of the Future](https://web3.bitget.com/en) 
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Bitget Wallet, BitKeep Upgrade - Apps on Google Play](https://play.google.com/store/apps/details?id=com.bitkeep.wallet&hl=en&gl=US) 
5. **Coin98**
  1. Coin98 Wallet is the #1 non-custodial, multi-chain wallet, and DeFi gateway, designed to seamlessly connect users to the crypto world in a safe and secure manner.
  2. https://coin98.com/wallet
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Coin98 Super Wallet - Apps on Google Play](https://play.google.com/store/apps/details?id=coin98.crypto.finance.media&hl=en&gl=US) 
6. **Zerion**
  1. Zerion Wallet is a non-custodial wallet for crypto that gives you access to a broad range of opportunities across DeFi and NFTs. With Zerion Wallet you can easily lend out your cryptocurrency and generate a yield. You can also provide liquidity and earn trading fees.
  2. [![img](https://assets-global.website-files.com/625440d0613eaa2ace513f45/656db612b2ca1740edfb94c5_Zerion_favicon.png)Crypto Wallet for NFTs & DeFi - Zerion](https://zerion.io/)
  3. https://chromewebstore.google.com/detail/zerion-wallet-for-web3-nf/klghhnkeealcohjjanjjdaeeggmfmlpl
7. **Rainbow**  
  1. Rainbow is a fun, simple, and secure way to get started with crypto and explore Ethereum. You can use Rainbow to purchase, manage, and display Ethereum-based assets on mainnet, Optimism, Arbitrum, Polygon, Base, and Zora.
  2. [![img](https://framerusercontent.com/images/bgm16Z9pe9YGDU72vUuHTzyYYk.png)Rainbow | Fun, powerful, and secure crypto wallets](https://rainbow.me/en/)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Rainbow Ethereum Wallet - Apps on Google Play](https://play.google.com/store/apps/details?id=me.rainbow&pcampaignid=web_share)
8. **Onekey**
  1. OneKey is an open-source project of a decentralized wallet that allows users to self-custody their own digital assets.
  2. [![img](https://asset.onekey-asset.com/portal/277a213afafbc1fd3338310e47223ff9a9628371/favicon-32x32.png?v=d5bfede322de37acb768e4cc259716f3)Open source crypto wallet trusted by millions.](https://onekey.so/)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)OneKey: Blockchain DeFi Wallet - Apps on Google Play](https://play.google.com/store/apps/details?id=so.onekey.app.wallet&hl=en&gl=US) 
9. **Tokenpocket**
  1. TokenPocket is a safe multi-chain digital cryptocurrency wallet that allows users to exchange Bitcoin, Ethereum, Polkadot, TRON, EOS, IOST, BOScoin, Polygon, and other cryptocurrencies. TokenPocket, which is built on the DApp portal, can easily connect with over 2200 pre-built DApps.
  2. https://www.tokenpocket.pro/ 
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)TokenPocket Wallet Crypto DeFi - Apps on Google Play](https://play.google.com/store/apps/details?id=vip.mytokenpocket&hl=en&gl=US) 
10. **Rabby**
  1. Rabby is an open source crypto wallet in your browser for Ethereum. It is built and maintained by the DeBank team. Designed for DeFi users with a smooth multi-chain experience. Protect your assets with pre-transaction potential risk scanning.
  2. [![img](https://rabby.io/assets/images/favicon.png)Rabby](https://rabby.io/) 
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Rabby Wallet - Crypto & EVM - Apps on Google Play](https://play.google.com/store/apps/details?id=com.debank.rabbymobile&hl=en_US) 
11. **Trust**
  1. Trust Wallet is a secure, self-custody crypto wallet supporting 10M+ assets across 70+ blockchains including crypto. Buy, sell, swap, transfer and earn crypto all in one place. Available for iOS, Android, and desktop browsers.
  2. https://trustwallet.com/
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Trust: Crypto & Bitcoin Wallet - Apps on Google Play](https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en&gl=US) 
12. **Coinbase**
  1. Coinbase Wallet is a web3 wallet and browser compatible with Ethereum and Solana. It allows you to have control over your cryptocurrencies, NFTs, DeFi activities, and digital assets. Coinbase Wallet is the simplest and most secure way to collect and view NFTs, earn cryptocurrency rewards through staking or decentralized finance (DeFi), and access thousands of decentralized applications (apps).
  2. [Coinbase Wallet - Your key to the world of crypto](https://www.coinbase.com/wallet)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Coinbase: Buy Bitcoin & Ether - Apps on Google Play](https://play.google.com/store/apps/details?id=com.coinbase.android&hl=en&gl=US) 
13. **Crypto.com**
  1. The Crypto.com DeFi Wallet is designed to give you full control and secured custody of your crypto. With the Crypto.com DeFi Wallet (a non-custodial wallet), you can send crypto to anyone around the world at your preferred confirmation speed and the network fee.
  2. [![img](https://crypto.com/__assets/favicon-32x32.png?v=0f6f06777a5d4bc338bfeca412628e1c)Crypto.com | Securely Buy, Sell & Trade Bitcoin, Ethereum and 350+ Altcoins](http://crypto.com/)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Crypto.com l DeFi Wallet - Apps on Google Play](https://play.google.com/store/apps/details?id=com.defi.wallet&hl=en&gl=US) 
14. **Binance**
  1. Binance Web3 Wallet is a self-custody crypto wallet within the Binance app, designed to empower users in the realm of decentralized finance (DeFi). Serving as a digital gateway to blockchain-based applications (dApps), it offers users a secure and streamlined method to manage their cryptocurrencies, execute token swaps across multiple chains, earn yields, and interact with a variety of blockchain platforms.
  2. https://www.binance.com/en/web3wallet
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)Binance: Buy Bitcoin & Crypto - Apps on Google Play](https://play.google.com/store/apps/details?id=com.binance.dev&hl=en&gl=US) 
15. **OKX**
  1. OKX Wallet is a universal crypto wallet available on multiple platforms, including app, web, and extension. You can use OKX Wallet to easily access 3,000+ crypto, 80+ networks, thousands of DApps, and the Web3 ecosystem.
  2. [![img](https://www.okx.com/cdn/assets/imgs/226/EB771F0EE8994DD5.png)Crypto, Bitcoin & Web3 Wallet | NFTs, DeFi, Web3 Portal](https://www.okx.com/web3)
  3. [![img](https://www.gstatic.com/android/market_images/web/favicon_v3.ico)OKX: Buy Bitcoin BTC & Crypto - Apps on Google Play](https://play.google.com/store/apps/details?id=com.okinc.okex.gp&hl=en&gl=US) 




## **Staking Guidelines**

### Restricted Region
- Staking is not available in restricted countries, including the US, Canada, China, Iran, North Korea, the Syrian Arab Republic, Netherlands, Crimea, Malaysia, Bangladesh, Bolivia and Cuba.

### Eligible Participants
- The staking addresses need to pass [Go+ security check](https://gopluslabs.io/malicious-address-detection).
- Users must hold MASK tokens to participate in the mining activity. There is no minimum holding requirement.

### Staking Model
- The staking model follows a points system. The higher the points, the greater the rewards. You need to stake MASK on the Ethereum mainnet to earn points.
- Regular users earn 1 point per hour for each staked MASK, while OKX staking users receive bonus points and can earn 1.05 points.
- The reward period spans the entire activity duration. The distribution of total rewards is based on the proportion of an individual's points to the total points.
- You can deposit MASK at any time during each period, and withdraw at a unified time at the end of the period. During each period, staked assets are locked and cannot be withdrawn. After a period ends, you can withdraw your staked MASK, claim the rewardToken from the previous activity period, or restake MASK for the next round of activities.

### Contract Security and Risks
- The stake MASK contract will undergo strict security audits and testing to ensure the safety of user assets.
- Despite our best efforts to ensure contract security, users should understand that participating in staking activities carries certain risks.
- Users are responsible for the market risks, smart contract vulnerabilities, and other potential risks associated with staking activities.
- Please carefully evaluate and assess the relevant risks before participating in staking activities and make decisions based on your risk tolerance.

## **Staking Tutorial**

### How to stake MASK?
***Note that you can only unstake your MASK after the event ends.**
1. Make sure you have MASK in your wallet address.
2. Connect your wallet to the Mask Stake website.
3. Find the staking project on the homepage, and click on the "Stake" button.
4. Fill in the amount of MASK you want to stake.
5. Confirm the transaction.
6. Wait for the transaction to be confirmed, and you have successfully staked MASK.
7. If you want to **add Stake**, simply repeat the above steps. Then your stake amount will increase, and the points accrual rate will also change.


### What is the stake MASK contract address? 
The stake MASK contract address is a unique identifier that allows you to interact with the staking functionality of MASK tokens. To find the specific contract address for MASK staking, you can navigate to "FAQs - Smart Contract - MASK Contract".


### How to unstake MASK?
1. When the staking activity for this period has ended, the unstake option will be opened.
2. Visit the Mask Stake official website where you have staked MASK tokens.
3. Find “Staked MASK” card, and click on the "Unstake MASK" button.
4. Confirm the transaction and wait for the unstaking process to complete.
5. Once the unstaking process is completed, your MASK tokens will be available for further use in your wallet.


### How to claim MASK staking reward?
1. When the staking activity for this period has ended, the claim option will be opened.
2. Visit the Mask Stake official website where you have staked MASK tokens.
3. Find “Estimated Rewards” card, and click on the "Claim" button.
4. After confirming the transaction, the staking rewards will be added to your wallet balance.


### How to reinvest MASK to the next period?
1. If the MASK staked in the previous period has not been withdrawn and a new staking period has started, you can transfer the unstaken MASK to the new period to continue participating in the staking activity.
2. Find the “Staked MASK” card from the previous period, and click on the "Reinvest MASK" button.
3. Confirm the reinvestment into the new staking period.
4. After on-chain confirmation, these MASK will be reinvested into the new staking period and earn points.
5. Reinvestment requires only one step, "Reinvest", without the need to "Unstake" and then "Stake", saving gas fees.


### What are the benefits of staking MASK?
1. **Earning rewards**: Staking MASK allows you to earn token rewards from high-quality investment projects.
2. **Long-term holding incentive**: Staking MASK encourages long-term token holding. With possible staking durations, you will be incentivized to lock your MASK tokens for a period of time, reducing frequent trading and potentially increasing long-term investment returns.


### What are the risks of staking MASK?
1. **Market risk**: The market value of MASK tokens may fluctuate, which can affect the value of your staked tokens. If the token price decreases, the value of your staked tokens may decrease.
2. **Contract risk**: Interacting with the staking contract for MASK tokens involves inherent risks associated with smart contracts. There is a possibility of contract vulnerabilities, misconfigurations, or attacks that could result in the loss of your staked funds.
3. **Unstake restrictions**: During the lock-up period of staked funds, you cannot unstake or withdraw your tokens. This may limit the flexibility of using your funds.
4. **Uncertain returns**: Staking MASK may lead to returns, but the specific rate of return is uncertain. The returns can be influenced by changes in the staking platform, market factors, and the behavior of network participants.
5. Mask Network Team is driven to mitigate the above risks and eliminate them entirely to the extent possible. Despite this, they may still exist.

## **Smart Contract**

### MASK Contract 
1. Chain name: ETH network
2. Address: 0x69af81e73a73b40adf4f3d4223cd9b1ece623074


### TON Contract 
1. Chain name: ETH network
2. Address: 0x582d872a1b094fc48f5de31d3b73f2d9be47def1


### RSS3 Contract
1. Chain name: ETH network
2. Address: 0xc98d64da73a6616c42117b582e832812e7b8d57f


### Stake Contract 
1. Test: 0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c


### Reward Contract 
1. Test: 0xf0c196d1b1489738cda956e994e82ef6897e85bc


## **Other**

### How to buy MASK？

You can buy MASK spot on major CEX such as Binance, OKX, and Gate.io .`
  const contentElRef = useRef<HTMLDivElement>(null)

  return (
    <Center w="100%" pt={{ base: '110px', md: '80px' }} px={{ base: '24px', xl: '48px' }} transition="200ms">
      <Flex
        w="100%"
        maxW="maxW"
        pt={{ base: 0, md: '64px' }}
        position="relative"
        direction={{ base: 'column', md: 'row' }}
      >
        <FaqsToc contentRef={contentElRef} />
        <Box
          ref={contentElRef}
          w="100%"
          color="neutrals.4"
          fontSize="16px"
          lineHeight="150%"
          sx={{
            'h1, h2, h3, h4, h5, h6': {
              mb: '32px',
              fontWeight: 700,
            },
            'p, ul, ol': {
              mb: '32px',
            },
            h1: {
              fontSize: '32px',
            },
            h2: {
              fontSize: '24px',
            },
            h3: {
              fontSize: '20px',
            },
            'ul, ol': {
              pl: '32px',
              img: {
                w: '16px',
                h: '16px',
                display: 'inline-block',
                mr: 1,
                transform: 'translateY(15%)',
              },
            },
            a: {
              textDecor: 'underline',
            },
          }}
        >
          <Markdown
            children={content}
            options={{
              enforceAtxHeadings: true,
              forceWrapper: true,
              forceBlock: true,
            }}
          />
        </Box>
      </Flex>
    </Center>
  )
}

export const Route = createFileRoute('/faqs')({
  component: () => <FaqsPage />,
})
