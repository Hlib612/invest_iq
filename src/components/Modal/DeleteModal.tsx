import React from 'react';
import { Modal } from './Modal';
import styles from './Modal.module.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Ви впевнені?',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className={styles.title}>{title}</p>
      <div className={styles.buttons}>
        <button 
          className={styles.confirmButton} 
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          ТАК
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          НІ
        </button>
      </div>
    </Modal>
  );
};