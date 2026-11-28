import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal } from './Modal';
import styles from './Modal.module.css';

import { logout } from '../../features/auth/authSlice';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutConfirm = () => {

    sessionStorage.clear();

    dispatch(logout());

    onClose();

    navigate('/login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className={styles.title}>Ви дійсно хочете вийти?</p>
      <div className={styles.buttons}>
        <button className={styles.confirmButton} onClick={handleLogoutConfirm}>
          ТАК
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          НІ
        </button>
      </div>
    </Modal>
  );
};