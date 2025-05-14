import {defineChain} from 'viem';

const localChain = defineChain({
  id: 31337,
  name: 'Local Hardhat Node',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {http: ['http://localhost:8545']}
  },
  testnet: true
});

const ogpuTestnetChain = defineChain({
  id: 200820172034,
  name: 'OpenGPU Testnet',
  nativeCurrency: {
    name: 'Test Open GPU',
    symbol: 'ToGPU',
    decimals: 18
  },
  rpcUrls: {
    default: {http: ['https://testnetrpc.ogpuscan.io']}
  },
  blockExplorers: {
    default: {
      name: 'OGPU Testnet Explorer',
      url: 'https://testnet.ogpuscan.io'
    }
  },
  testnet: true
});

const ogpuChain = defineChain({
  id: 1071,
  name: 'OpenGPU Mainnet',
  nativeCurrency: {
    name: 'Open GPU',
    symbol: 'OGPU',
    decimals: 18
  },
  rpcUrls: {
    default: {http: ['https://mainnet-rpc.ogpuscan.io']}
  },
  blockExplorers: {
    default: {
      name: 'OGPU Explorer',
      url: 'https://ogpuscan.io'
    }
  }
});

export {localChain, ogpuChain, ogpuTestnetChain};
