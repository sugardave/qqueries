import {type FC} from 'react';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AutoLottoApp} from '../AutoLottoApp/AutoLottoApp';
import {AutoLottoAdmin} from '../AutoLottoAdmin/AutoLottoAdmin';
import {wagmiConfig} from '../../lib/wagmiConfig';

import './AutoLottoPOC.css';

const queryClient = new QueryClient();

const AutoLottoPOC: FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <section className="auto-lotto-poc">
          <div></div>
          <AutoLottoApp />
          <AutoLottoAdmin />
        </section>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default AutoLottoPOC;
export {AutoLottoPOC};
