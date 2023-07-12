import { type HardhatUserConfig } from 'hardhat/types';
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import './tasks/setState';

const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 1337 // https://hardhat.org/metamask-issue.html
    },
    localhost: {
      chainId: 1337,
      url: 'http://localhost:8545'
    }
  },
  paths: { sources: './contracts/src' },
  typechain: {
    outDir: './types',
    target: 'ethers-v6'
  },
  solidity: '0.8.17'
};

export default config;
