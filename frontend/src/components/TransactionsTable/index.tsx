import { useEffect, useState } from 'react';
import { ITransactions } from '../../interfaces';
import { api } from '../../services/api';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './styles.module.scss'

export function TransactionsTable() {
  const username = localStorage.getItem('username') as string
  const [transactions, setTransactions] = useState<ITransactions[]>([] as ITransactions[])
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [typeToFilter, setTypeToFilter] = useState('');

  async function getTransactions(dateQuery?: (string | null)[] | undefined, typeQuery?: string) {
    let url = '/transaction'
    if (dateQuery) {
      url += `?dateStart=${dateQuery[0]}&dateEnd=${dateQuery[1]}`
    }
    if (typeQuery) {
      url += url.includes('?') ? `&type=${typeQuery}` : `?type=${typeQuery}`
    }

    const { data } = await api.get<ITransactions[]>(url)
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    setTransactions(data)
  }

  useEffect(() => {
    const dates = endDate ? [startDate && startDate.toISOString().split("T")[0],
    endDate && endDate.toISOString().split("T")[0]] : undefined

    getTransactions(dates, typeToFilter)
  }, [endDate, typeToFilter])

  function handleChange(event: any) {
    setTypeToFilter(event.target.value)
  }

  function resetRadioState() {
    setTypeToFilter('')
    setStartDate(null)
    setEndDate(null)
    getTransactions()
  }

  function onChangeHandler(dates: any) {
    const [start, end] = dates
    setStartDate(start);
    setEndDate(end);
  }

  return (
    <div className={styles.container}>
      <h2>Transactions</h2>
      <div>
        <h4>Search by a time period:</h4>
        <DatePicker
          selectsRange
          className={styles.calendar}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          onChange={onChangeHandler}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a period"
        />
      </div>
      <div>
        <h4>Filter by transactions:</h4>
        <div className={styles.inputContainer}>
          <label>
            <input
              type="radio"
              value="cashOut"
              checked={typeToFilter === 'cashOut'}
              onChange={handleChange}
            />
            Sent
          </label>
          <label>
            <input
              type="radio"
              value="cashIn"
              checked={typeToFilter === 'cashIn'}
              onChange={handleChange}
            />
            Received
          </label>
        </div>
      </div>
      <div>
        <button
          type="reset"
          onClick={resetRadioState}
          className={styles.reset}
        >
          Reset
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>From / To</th>
              <th>Value</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, debitedUser, creditedUser, value, createdAt}) => (
              <tr key={ id }>
                <td>{ debitedUser.username === username ? 'Sent' : 'Received' }</td>
                <td>{ debitedUser.username === username ?
                creditedUser.username :
                debitedUser.username }</td>
                <td>{ `R$ ${value}` }</td>
                <td>{ new Date(createdAt).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'numeric',
                    year: 'numeric',
                  }) }
                </td>
                <td>{ new Date(createdAt).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}