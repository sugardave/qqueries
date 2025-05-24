import './AutoLottoInfoItem.css';

interface AutoLottoInfoItemProps {
  label: string;
  value: string;
}

const AutoLottoInfoItem = ({label, value}: AutoLottoInfoItemProps) => {
  return (
    <section className="auto-lotto-info-item">
      <div className="auto-lotto-info-item__label">{label}</div>
      <div className="auto-lotto-info-item__value">{value}</div>
    </section>
  );
};

export default AutoLottoInfoItem;
export {AutoLottoInfoItem};
