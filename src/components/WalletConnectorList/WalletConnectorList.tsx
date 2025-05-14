import {useEffect, useState} from 'react';
import {useConnect} from 'wagmi';
import {WalletConnectorListItem} from './WalletConnectorListItem';
import './WalletConnectorList.css';

const WalletConnectorList = () => {
  const {connect, connectors} = useConnect();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <div className="wallet-connector-list">
      {connectors.length ? (
        <>
          <p>Please connect your wallet</p>
          {connectors.map((connector) => {
            const {icon, name, uid} = connector;

            return (
              <WalletConnectorListItem
                key={uid}
                connector={connector}
                icon={icon!}
                name={name}
                onClick={() => connect({connector})}
              />
            );
          })}
        </>
      ) : (
        <p>
          No wallet providers detected. Please install one before continuing.
        </p>
      )}
    </div>
  );
};

export default WalletConnectorList;
export {WalletConnectorList};
