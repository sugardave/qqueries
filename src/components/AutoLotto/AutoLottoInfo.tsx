import {useEffect, useState, type FC} from 'react';
import {useConfig, useWatchContractEvent} from 'wagmi';
import {readContracts} from 'wagmi/actions';
import {type Config as WagmiConfig} from 'wagmi';
import {formatEther} from 'viem';
import {AutoLottoPurchase} from './AutoLottoPurchase';
import {autoLottoContract} from '../../lib';

import './AutoLottoInfo.css';

const currency = 'ToGPU';
const contractsAndMethods = [
  {...autoLottoContract, functionName: 'getNumberOfAvailableTickets'},
  {...autoLottoContract, functionName: 'maxTickets'},
  {...autoLottoContract, functionName: 'ticketPrice'},
  {...autoLottoContract, functionName: 'endTime'},
  {...autoLottoContract, functionName: 'getLotteryValue'}
] as const;

const AutoLottoInfo: FC = () => {
  const [availableTickets, setAvailableTickets] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maximumTickets, setMaximumTickets] = useState('');
  const [prizeTotal, setPrizeTotal] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const wagmiConfig = useConfig();

  const getAutoLottoInfo = async (config: WagmiConfig = wagmiConfig) => {
    const [
      {result: remainingTickets},
      {result: maxTickets},
      {result: price},
      {result: endTime},
      {result: lotteryValue}
    ] = await readContracts(config, {contracts: contractsAndMethods});

    setAvailableTickets(remainingTickets?.toString() || '0');
    setMaximumTickets(maxTickets?.toString() || '0');
    setTicketPrice(formatEther(price ?? 0n));
    setPrizeTotal(formatEther(lotteryValue ?? 0n));

    const endsAt = new Date(Number(endTime) * 1000);

    setEndDate(endsAt.toLocaleString());
  };

  useWatchContractEvent({
    ...autoLottoContract,
    eventName: 'LotteryTicketPurchased',
    onLogs() {
      // update info when a ticket is purchased
      getAutoLottoInfo();
    }
  });

  useEffect(() => {
    getAutoLottoInfo();
  }, []);

  return (
    <section className="auto-lotto-info">
      <section className="auto-lotto-info__grid">
        <div className="auto-lotto-info__grid-item">
          <span className="auto-lotto-info__label">Prize Total</span>
          <span className="auto-lotto-info__value">
            {prizeTotal} {currency}
          </span>
        </div>
        <div className="auto-lotto-info__grid-item">
          <span className="auto-lotto-info__label">End Date</span>
          <span className="auto-lotto-info__value">{endDate}</span>
        </div>
        <div className="auto-lotto-info__grid-item">
          <span className="auto-lotto-info__label">Tickets Remaining</span>
          <span className="auto-lotto-info__value">
            {availableTickets}/{maximumTickets}
          </span>
        </div>
        <div className="auto-lotto-info__grid-item">
          <span className="auto-lotto-info__label">Ticket Price</span>
          <span className="auto-lotto-info__value">
            {ticketPrice} {currency}
          </span>
        </div>
      </section>
      <AutoLottoPurchase
        maximumTickets={availableTickets}
        ticketPrice={ticketPrice}
      />
    </section>
  );
};

export default AutoLottoInfo;
export {AutoLottoInfo};
