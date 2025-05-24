import type {MouseEvent} from 'react';

import './AutoLottoButton.css';

interface AutoLottoButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

const AutoLottoButton = ({
  onClick,
  label,
  disabled = false,
  className = ''
}: AutoLottoButtonProps) => {
  return (
    <button
      className={`auto-lotto-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="auto-lotto-button__label">{label}</span>
    </button>
  );
};

export default AutoLottoButton;
export {AutoLottoButton};
