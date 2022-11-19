import { useEffect, useState } from 'react';
import { ITransactions } from '../../interfaces';
import { api } from '../../services/api';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

    const { data } = await api.get(url)
    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  function filterTransactions() {
    const date = startDate ? startDate.toISOString().split("T")[0] : undefined
    getTransactions(date, typeToFilter)
  };

  function handleChange(event: any) {
    setTypeToFilter(event.target.value)
  }

  function resetRadioState() {
    setTypeToFilter('')
    setStartDate(undefined)
    getTransactions()
  }

  return (
    <div className=".container">
      <h2>Transações</h2>
      <DatePicker
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date: Date) => setStartDate(date)}
        maxDate={new Date()}
      />
      <label>
      <input
        type="radio"
        value="cashOut"
        checked={typeToFilter === 'cashOut'}
        onChange={handleChange}
      />
      Enviados
    </label>
    <label>
      <input
        type="radio"
        value="cashIn"
        checked={typeToFilter === 'cashIn'}
        onChange={handleChange}
      />
      Recebidos
    </label>
    <div>
      <button
        type="reset"
        onClick={resetRadioState}
      />
    </div>
    <div>
      <button
        type="button"
        onClick={filterTransactions}
      >
        Filtrar
      </button>
    </div>
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
                  hour: '2-digit',
                  minute: '2-digit',
                }) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}