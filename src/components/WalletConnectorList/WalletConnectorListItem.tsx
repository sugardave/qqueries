import {useEffect, useState} from 'react';
import {type Connector} from 'wagmi';

import './WalletConnectorListItem.css';

interface WalletConnectorListItemProps {
  connector: Connector;
  icon: string;
  name: string;
  onClick: () => void;
}

const WalletConnectorListItem = ({
  connector,
  icon,
  name,
  onClick
}: WalletConnectorListItemProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };

    getProvider();
  }, [connector]);

  return (
    <button
      className="wallet-connector__button"
      disabled={!ready}
      onClick={onClick}
    >
      <img className="wallet-connector__image" src={icon} alt={name} />
      <span className="wallet-connector__text">{name}</span>
    </button>
  );
};

export default WalletConnectorListItem;
export {WalletConnectorListItem};
