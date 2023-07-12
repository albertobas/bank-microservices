'use client';

import { localhost } from 'wagmi/chains';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost], // [mainnet, goerli, optimism, avalanche],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! }),
    // infuraProvider({ apiKey: process.env.INFURA_API_KEY! }),
    publicProvider()
  ]
);
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true
      }
    })
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: (detectedName) =>
    //       `Injected (${typeof detectedName === 'string' ? detectedName : detectedName.join(', ')})`,
    //     shimDisconnect: true
    //   }
    // })
  ],
  publicClient,
  webSocketPublicClient
});

export function WagmiProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
