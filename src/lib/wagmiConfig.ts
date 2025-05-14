import {ogpuTestnetChain} from './viemClient';
import {createConfig, http} from 'wagmi';

const wagmiConfig = createConfig({
  chains: [ogpuTestnetChain],
  transports: {
    [ogpuTestnetChain.id]: http()
  }
});

export default wagmiConfig;
export {wagmiConfig};
