import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { MakeTransaction } from '../../components/MakeTransaction';
import { api } from '../../services/api';

export function Home() {
  const [balance, setBalance] = useState(0)
  const [transactionSent, settransactionSent] = useState(false)

  async function getBalance() {
    const { data } = await api.get('/account')
    setBalance(data.balance)
  }

  useEffect(() => {
    getBalance()
    settransactionSent(false)
  }, [transactionSent])

  return (
    <div className=".container">
      <Header balance={balance} />
      <MakeTransaction setTransactionSent={settransactionSent} />
    </div>
  );
}