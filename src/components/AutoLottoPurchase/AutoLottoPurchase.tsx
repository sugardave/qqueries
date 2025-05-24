import {useState, type FC} from 'react';
import {useAccount, useWriteContract} from 'wagmi';
import {parseEther} from 'viem';
import {AutoLottoPurchaseButton} from './AutoLottoPurchaseButton';
import {WalletConnectorList} from '../WalletConnectorList/WalletConnectorList';
import {WalletConnectorModal} from '../WalletConnectorModal/WalletConnectorModal';
import {autoLottoContract} from '../../lib';

interface AutoLottoPurchaseProps {
  maximumTickets: string;
  ticketPrice: string;
}

const AutoLottoPurchase: FC<AutoLottoPurchaseProps> = ({
  maximumTickets,
  ticketPrice
}) => {
  const {isConnected} = useAccount();
  const [ticketCount, setTicketCount] = useState('1'); // default to minimum ticket purchase of 1
  const {writeContract: purchaseTicket} = useWriteContract();

  const handlePurchase = () => {
    purchaseTicket({
      ...autoLottoContract,
      functionName: 'purchaseTicket',
      args: [BigInt(ticketCount)],
      value: parseEther(ticketPrice) * BigInt(ticketCount)
    });
  };

  const updateTicketCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketCount(e.target.value);
  };

  return (
    <section className="auto-lotto-purchase__grid">
      <div className="auto-lotto-purchase__grid-item">
        <AutoLottoPurchaseButton
          maximumTickets={maximumTickets}
          value={ticketCount}
          onChange={updateTicketCount}
          onClick={handlePurchase}
        />
      </div>
      <WalletConnectorModal isOpen={!isConnected}>
        <WalletConnectorList />
      </WalletConnectorModal>
    </section>
  );
};

export default AutoLottoPurchase;
export {AutoLottoPurchase};
