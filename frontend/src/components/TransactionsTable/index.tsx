import { useEffect, useState } from 'react';
import { ITransactions } from '../../interfaces';
import { api } from '../../services/api';

export function TransactionsTable() {
  const username = localStorage.getItem('username') as string
  const [transactions, setTransactions] = useState<ITransactions[]>([] as ITransactions[])

  async function getTransactions() {
    const { data } = await api.get('/transaction')
    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className=".container">
      <h2>Transações</h2>
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