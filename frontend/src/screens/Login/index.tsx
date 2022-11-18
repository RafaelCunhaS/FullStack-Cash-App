import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiLock, FiSend, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';
import { CustomInput } from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { IDataForm } from '../../interfaces';

const schema = yup.object().shape({
  username: yup.string().required('Username obrigatório').min(3, 'No mínimo 3 caracteres'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(8, 'No mínimo 8 caracteres')
    // .matches(/[A-Z]/, 'Must contain at least one uppercase character')
    // .matches(/[0-9]/, 'Must contain at least one number')
}).required();

export function Login() {
  const navigate = useNavigate();
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  function showPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  async function onSubmit(dataForm: IDataForm) {
    try {
      const { data } = await api.post('/login', dataForm);
      if (data.token) {
        navigate('/home');
      }
    } catch (error: any) {
        toast.warning(error?.response?.data?.error);
        console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Cash App</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="off"
        autoCapitalize="off"
      >
        <h2>Login</h2>
        <CustomInput
          label="Username"
          Icon={FiUser}
          {...register('username')}
          error={errors.username}
        />

        <CustomInput
          type={isShowingPassword ? 'text' : 'password'}
          label="Senha"
          Icon={FiLock}
          {...register('password')}
          error={errors.password}
          isPassword={true}
          showPassword={showPassword}
          isShowingPassword={isShowingPassword}
        />

        <button className={styles.button} type="submit">
          Enviar <FiSend />
        </button>

        <Link className={styles.link} to="/register">
          criar uma conta
        </Link>
      </form>
    </div>
  );
}