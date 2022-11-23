import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiLock, FiSend, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';
import { CustomInput } from '../../components/Input';
import { Link } from 'react-router-dom';
import { IDataForm } from '../../interfaces';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

const schema = yup.object().shape({
  username: yup.string().required('Username required').min(3),
  password: yup.string()
    .required('Password required')
    .min(8),
}).required();

export function Login() {
  const { signIn } = useAuth()
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
    signIn(dataForm)
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="off"
        autoCapitalize="off"
      >
        <h1>Cash App</h1>
        <h2>Login</h2>
        <CustomInput
          label="Username"
          Icon={FiUser}
          {...register('username')}
          error={errors.username}
        />

        <CustomInput
          type={isShowingPassword ? 'text' : 'password'}
          label="Password"
          Icon={FiLock}
          {...register('password')}
          error={errors.password}
          isPassword={true}
          showPassword={showPassword}
          isShowingPassword={isShowingPassword}
        />

        <Button title="Login" icon={<FiSend />} type="submit" />

        <Link className={styles.link} to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}