import {useEffect, useState} from 'react';
import {
  useAccount,
  useConfig,
  useWatchContractEvent,
  useWriteContract
} from 'wagmi';
import {readContracts} from 'wagmi/actions';
import {AutoLottoInfo, AutoLottoInfoItem} from '../AutoLottoInfo';
import {AutoLottoButton} from '../AutoLottoButton/AutoLottoButton';
import {autoLottoContract} from '../../lib';

import './AutoLottoAdmin.css';

const contractsAndMethods = [
  {...autoLottoContract, functionName: 'owner'},
  {...autoLottoContract, functionName: 'getNumberOfAvailableTickets'},
  {...autoLottoContract, functionName: 'maxTickets'},
  {...autoLottoContract, functionName: 'minTickets'}
] as const;

const AutoLottoAdmin = () => {
  const [availableTickets, setAvailableTickets] = useState<string>('');
  const [canExecute, setCanExecute] = useState<boolean>(false);
  const [owner, setOwner] = useState<string>('');
  const [minTickets, setMinTickets] = useState<string>('');
  const [maxTickets, setMaxTickets] = useState<string>('');
  const {writeContract: cancelLottery} = useWriteContract();
  const {writeContract: closeLottery} = useWriteContract();
  const {address} = useAccount();
  const wagmiConfig = useConfig();

  const handleCancel = () => {
    cancelLottery({...autoLottoContract, functionName: 'cancelLottery'});
  };

  const handleExecution = () => {
    closeLottery({...autoLottoContract, functionName: 'closeLottery'});
  };

  const getContractInfo = async () => {
    const [
      {result: contractOwner},
      {result: remainingTickets},
      {result: maximumTickets},
      {result: minimumTickets}
    ] = await readContracts(wagmiConfig, {
      contracts: contractsAndMethods
    });
    setOwner(contractOwner?.toString() || '0');
    setAvailableTickets(remainingTickets?.toString() || '0');
    setMaxTickets(maximumTickets?.toString() || '0');
    setMinTickets(minimumTickets?.toString() || '0');
    setCanExecute(
      Number(minTickets) > 0 &&
        Number(maxTickets) - Number(availableTickets) >= Number(minTickets)
    );
  };

  useWatchContractEvent({
    ...autoLottoContract,
    eventName: 'LotteryTicketPurchased',
    onLogs: () => {
      getContractInfo();
    }
  });

  useEffect(() => {
    getContractInfo();
  }, [address, availableTickets]);

  return owner && address && owner === address ? (
    <section className="auto-lotto-admin">
      <h1>Auto Lotto Admin</h1>
      <AutoLottoInfo>
        <AutoLottoInfoItem label="Owner" value={owner} />
      </AutoLottoInfo>
      <AutoLottoButton
        className="auto-lotto-admin__execute-button"
        onClick={handleExecution}
        label="Execute Lottery"
        disabled={!canExecute}
      />
      <AutoLottoButton
        className="auto-lotto-admin__execute-button"
        onClick={handleCancel}
        label="Cancel Lottery"
      />
    </section>
  ) : null;
};

export default AutoLottoAdmin;
export {AutoLottoAdmin};
