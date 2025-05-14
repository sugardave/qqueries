import {type FC} from 'react';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AutoLottoInfo} from './AutoLottoInfo';
import {wagmiConfig} from '../../lib/wagmiConfig';

const queryClient = new QueryClient();

const AutoLottoPOC: FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AutoLottoInfo />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default AutoLottoPOC;
export {AutoLottoPOC};
