import type {ChangeEvent, MouseEvent} from 'react';
import {AutoLottoButton} from '../AutoLottoButton/AutoLottoButton';

import './AutoLottoPurchaseButton.css';

interface AutoLottoPurchaseButtonProps {
  maximumTickets: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AutoLottoPurchaseButton = ({
  onChange,
  onClick,
  maximumTickets,
  value
}: AutoLottoPurchaseButtonProps) => {
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
      <AutoLottoButton
        className="purchase-button__button"
        onClick={onClick}
        label="Purchase Ticket(s)"
      />
    </section>
  );
};

export default AutoLottoPurchaseButton;
export {AutoLottoPurchaseButton};
