import { FiLogOut } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi'
import { useAuth } from '../../hooks/auth';
import { IHeader } from '../../interfaces';
import styles from './styles.module.scss'

export function Header({ balance }: IHeader) {
  const { signOut } = useAuth();
  const username = localStorage.getItem('username');

  return (
    <div className={styles.header}>
      <p className="">
        Hello, <span>{username}</span>
      </p>
      <p>Balance<span className={styles.icon}><GiWallet /></span>: {`R$ ${balance}`}</p>
      <div className={styles.logout}>
        <p onClick={signOut}>Logout <span className={styles.icon}><FiLogOut /></span></p>
      </div>
    </div>
  );
}