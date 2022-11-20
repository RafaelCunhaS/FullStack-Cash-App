import { useEffect, useState } from 'react';
import { ITransactions } from '../../interfaces';
import { api } from '../../services/api';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './styles.module.scss'

export function TransactionsTable() {
  const username = localStorage.getItem('username') as string
  const [transactions, setTransactions] = useState<ITransactions[]>([] as ITransactions[])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [typeToFilter, setTypeToFilter] = useState('');

  async function getTransactions(dateQuery?: string, typeQuery?: string) {
    let url = '/transaction'
    if (dateQuery) url += `?date=${dateQuery}`
    if (typeQuery) {
      url += url.includes('?') ?`&type=${typeQuery}` : `?type=${typeQuery}`
    }

    const { data } = await api.get<ITransactions[]>(url)
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    setTransactions(data)
  }

  useEffect(() => {
    const date = startDate ? startDate.toISOString().split("T")[0] : undefined
    getTransactions(date, typeToFilter)
  }, [startDate, typeToFilter])

  function handleChange(event: any) {
    setTypeToFilter(event.target.value)
  }

  function resetRadioState() {
    setTypeToFilter('')
    setStartDate(undefined)
    getTransactions()
  }

  return (
    <div className={styles.container}>
      <h2>Transações</h2>
      <div>
        <h4>Procurar transações pela data:</h4>
        <DatePicker
          className={styles.calendar}
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => setStartDate(date)}
          maxDate={new Date()}
          placeholderText={`${new Date().toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: 'numeric',
                  year: 'numeric',
                })}`}
        />
      </div>
      <div>
        <h4>Filtrar por transações:</h4>
        <label>
          <input
            type="radio"
            value="cashOut"
            checked={typeToFilter === 'cashOut'}
            onChange={handleChange}
            placeholder=""
          />
          Enviadas
        </label>
        <label>
          <input
            type="radio"
            value="cashIn"
            checked={typeToFilter === 'cashIn'}
            onChange={handleChange}
          />
          Recebidas
        </label>
      </div>
      <div>
        <button
          type="reset"
          onClick={resetRadioState}
          className={styles.reset}
        >
          Resetar filtros
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>De / Para</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, debitedUser, creditedUser, value, createdAt}) => (
              <tr key={ id }>
                <td>{ debitedUser.username === username ? 'Enviada' : 'Recebida' }</td>
                <td>{ debitedUser.username === username ?
                creditedUser.username :
                debitedUser.username }</td>
                <td>{ `R$ ${value}` }</td>
                <td>{ new Date(createdAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: 'numeric',
                    year: 'numeric',
                  }) }
                </td>
                <td>{ new Date(createdAt).toLocaleString('pt-BR', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }).replace(':', 'h') }m
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}