import type {MouseEvent} from 'react';

interface AutoLottoExecuteButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AutoLottoExecuteButton = ({onClick}: AutoLottoExecuteButtonProps) => {
  return (
    <button className="auto-lotto-execute-button__button" onClick={onClick}>
      <span className="auto-lotto-execute-button__label">Execute</span>
    </button>
  );
};

export default AutoLottoExecuteButton;
export {AutoLottoExecuteButton};
