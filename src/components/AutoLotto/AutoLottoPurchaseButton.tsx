import type {FC, ChangeEvent, MouseEvent} from 'react';

import './AutoLottoPurchaseButton.css';

interface AutoLottoPurchaseButtonProps {
  maximumTickets: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AutoLottoPurchaseButton: FC<AutoLottoPurchaseButtonProps> = ({
  onChange,
  onClick,
  maximumTickets,
  value
}) => {
  return (
    <section className="purchase-button">
      <input
        className="purchase-button__input"
        type="number"
        required
        min="1"
        max={maximumTickets}
        inputMode="numeric"
        value={value}
        onChange={onChange}
      />
      <button className="purchase-button__button" onClick={onClick}>
        <span className="purchase-button__label">Purchase Ticket(s)</span>
      </button>
    </section>
  );
};

export default AutoLottoPurchaseButton;
export {AutoLottoPurchaseButton};
