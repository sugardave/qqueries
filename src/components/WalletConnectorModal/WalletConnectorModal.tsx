import {useEffect, useRef, type KeyboardEvent, type ReactNode} from 'react';

import './WalletConnectorModal.css';

interface WalletConnectorModalProps {
  children: ReactNode;
  hasCloseButton?: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

const WalletConnectorModal = ({
  children,
  hasCloseButton,
  isOpen,
  onClose
}: WalletConnectorModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      className="wallet-connector-modal__dialog"
      onKeyDown={handleKeyDown}
    >
      {hasCloseButton && (
        <button
          className="wallet-connector-modal__close-button"
          onClick={handleCloseModal}
        >
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};

export default WalletConnectorModal;
export {WalletConnectorModal};
