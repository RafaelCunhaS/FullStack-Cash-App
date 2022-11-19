import { FiLogOut } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi'
import { useAuth } from '../../hooks/auth';
import { IHeader } from '../../interfaces';

export function Header({ balance }: IHeader) {
  const { signOut } = useAuth();
  const username = localStorage.getItem('username');

  return (
    <div className=".container">
      <div className="">
        <div className="">
          <div className="">
            <p className="">
              Olá, <span>{username}</span>
            </p>
            <GiWallet /> <span>{balance}</span>
            <div className="">
              <p onClick={signOut}>Sair </p> <FiLogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}