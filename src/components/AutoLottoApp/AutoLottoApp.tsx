import {useEffect, useState, type FC} from 'react';
import type {Config as WagmiConfig} from 'wagmi';
import {useConfig, useWatchContractEvent} from 'wagmi';
import {readContracts} from 'wagmi/actions';
import {formatEther} from 'viem';
import {AutoLottoPurchase} from '../AutoLottoPurchase/AutoLottoPurchase';
import {AutoLottoInfo, AutoLottoInfoItem} from '../AutoLottoInfo';
import {autoLottoContract, formatWalletAddress} from '../../lib';

import './AutoLottoApp.css';

enum LotteryState {
  OPEN,
  CLOSED,
  COMPLETED,
  CANCELED,
  UNKNOWN
}

const currency = 'ToGPU';
const contractsAndMethods = [
  {...autoLottoContract, functionName: 'getNumberOfAvailableTickets'},
  {...autoLottoContract, functionName: 'maxTickets'},
  {...autoLottoContract, functionName: 'ticketPrice'},
  {...autoLottoContract, functionName: 'endTime'},
  {...autoLottoContract, functionName: 'getLotteryState'},
  {...autoLottoContract, functionName: 'getLotteryValue'},
  {...autoLottoContract, functionName: 'winner'}
] as const;

const AutoLottoApp: FC = () => {
  const [availableTickets, setAvailableTickets] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maximumTickets, setMaximumTickets] = useState('');
  const [prizeTotal, setPrizeTotal] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [winner, setWinner] = useState('');
  const [lotteryState, setLotteryState] = useState<LotteryState>(
    LotteryState.UNKNOWN
  );

  const wagmiConfig = useConfig();

  const getAutoLottoInfo = async (config: WagmiConfig = wagmiConfig) => {
    const [
      {result: remainingTickets},
      {result: maxTickets},
      {result: price},
      {result: endTime},
      {result: state},
      {result: lotteryValue},
      {result: winner}
    ] = await readContracts(config, {contracts: contractsAndMethods});

    setAvailableTickets(remainingTickets?.toString() || '0');
    setMaximumTickets(maxTickets?.toString() || '0');
    setTicketPrice(formatEther(price ?? 0n));
    setPrizeTotal(formatEther(lotteryValue ?? 0n));
    setLotteryState(state as LotteryState);
    setWinner(winner ? winner.toString() : '');

    const endsAt = new Date(Number(endTime) * 1000);
    const dateOptions = {
      hour12: false,
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      month: '2-digit' as const,
      day: '2-digit' as const,
      year: '2-digit' as const
    };

    setEndDate(new Intl.DateTimeFormat(undefined, dateOptions).format(endsAt));
  };

  useWatchContractEvent({
    ...autoLottoContract,
    eventName: 'LotteryTicketPurchased',
    onLogs() {
      // update info when a ticket is purchased
      getAutoLottoInfo();
    }
  });

  useWatchContractEvent({
    ...autoLottoContract,
    eventName: 'LotteryCanceled',
    onLogs() {
      // update info when the lottery is canceled
      getAutoLottoInfo();
    }
  });

  useWatchContractEvent({
    ...autoLottoContract,
    eventName: 'LotteryCompleted',
    onLogs() {
      // update info when the lottery is completed
      getAutoLottoInfo();
    }
  });

  useEffect(() => {
    getAutoLottoInfo();
  }, []);

  return (
    <section className="auto-lotto-app">
      <AutoLottoInfo>
        <AutoLottoInfoItem
          label="Prize Total"
          value={`${prizeTotal} ${currency}`}
        />
        <AutoLottoInfoItem
          label="End Date"
          value={
            lotteryState === LotteryState.COMPLETED
              ? 'Ended'
              : lotteryState === LotteryState.CLOSED
                ? 'Closed'
                : lotteryState === LotteryState.CANCELED
                  ? 'Canceled'
                  : endDate
          }
        />
        <AutoLottoInfoItem
          label="Tickets Remaining"
          value={`${availableTickets}/${maximumTickets}`}
        />
        <AutoLottoInfoItem
          label="Ticket Price"
          value={`${ticketPrice} ${currency}`}
        />
      </AutoLottoInfo>
      {lotteryState === LotteryState.OPEN ? (
        <AutoLottoPurchase
          maximumTickets={availableTickets}
          ticketPrice={ticketPrice}
        />
      ) : null}
      {lotteryState === LotteryState.COMPLETED ? (
        <AutoLottoInfoItem label="Winner" value={formatWalletAddress(winner)} />
      ) : null}
    </section>
  );
};

export default AutoLottoApp;
export {AutoLottoApp};
