import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { MakeTransaction } from '../../components/MakeTransaction';
import { TransactionsTable } from '../../components/TransactionsTable';
import { api } from '../../services/api';
import { MdAttachMoney } from 'react-icons/md'
import styles from './styles.module.scss'
import { FiArrowLeft } from 'react-icons/fi';

export function Home() {
  const [balance, setBalance] = useState(0)
  const [transactionSent, settransactionSent] = useState(false)
  const [makeTransaction, setmakeTransaction] = useState(false)

  async function getBalance() {
    const { data } = await api.get('/account')
    setBalance(data.balance)
  }

  useEffect(() => {
    getBalance()
    settransactionSent(false)
  }, [transactionSent])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Header balance={balance} />
        
        {!makeTransaction ? <TransactionsTable /> :
        <MakeTransaction setTransactionSent={settransactionSent} /> }
  
        {!makeTransaction ? 
        <Button
        title="New Transaction"
        icon={<MdAttachMoney />}
        onClick={() => setmakeTransaction(!makeTransaction)}
        /> :
        <p className={styles.link} onClick={() => setmakeTransaction(!makeTransaction)}>
          <span><FiArrowLeft /></span> See all transactions
        </p> }
      </div>
    </div>
  );
}