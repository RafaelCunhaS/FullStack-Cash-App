import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

export function Home() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function getBalance() {
      const { data } = await api.get('/account')
      setBalance(data.balance)
    }

    getBalance()
  }, [])

  return (
    <div className=".container">
      <Header balance={balance} />
    </div>
  );
}