import type {ReactNode} from 'react';
import './AutoLottoInfo.css';

interface AutoLottoInfoProps {
  children: ReactNode;
}

const AutoLottoInfo = ({children}: AutoLottoInfoProps) => {
  return <section className="auto-lotto-info">{children}</section>;
};

export default AutoLottoInfo;
export {AutoLottoInfo};
