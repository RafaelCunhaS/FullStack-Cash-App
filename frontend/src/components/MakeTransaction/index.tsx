import { Button } from '../Button';
import { FiUser } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { INewTransaction, ITransactionSent } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { CustomInput } from '../Input';
import { FcMoneyTransfer } from 'react-icons/fc'
import { FaMoneyBillWave } from 'react-icons/fa'
import styles from './styles.module.scss'

export function MakeTransaction({ setTransactionSent }: ITransactionSent) {
  const username = localStorage.getItem('username');

  const schema = yup.object().shape({
    username: yup.string().required('Receiver username required')
      .notOneOf([username], 'Not possible to make a transaction to the same user'),
    value: yup.number()
      .required('Insert a value')
      .min(0.01, 'Value needs to be greater than 0'),
  }).required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewTransaction>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(dataForm: INewTransaction) {
    try {
      const { status } = await api.post('/transaction', dataForm);
      if (status === 201) {
        toast.success('Transaction successful');
        setTransactionSent(true)
        reset()
      }
    } catch (error: any) {
      console.log(error);
      toast.warning(error.response.data.message);
    }
  }

  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="off"
        autoCapitalize="off"
      >
        <h2>Nova Transferência</h2>
        <CustomInput
          label="Receiver"
          placeholder="Username"
          Icon={FiUser}
          {...register('username')}
          error={errors.username}
        />

        <CustomInput
          type="number"
          step="0.01"
          label="Value"
          placeholder='0,00'
          onKeyPress={(event) => {
            if (!/[0-9.,]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          Icon={FaMoneyBillWave}
          {...register('value')}
          error={errors.value}
        />

        <Button title="Make Transaction" icon={<FcMoneyTransfer />} type="submit" />
      </form>
  );
}