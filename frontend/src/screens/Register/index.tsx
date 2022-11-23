import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import {
  FiArrowLeft,
  FiLock,
  FiSave,
  FiUser,
} from 'react-icons/fi';
import styles from './styles.module.scss';
import { CustomInput } from '../../components/Input';
import { Link } from 'react-router-dom';
import { IDataForm } from '../../interfaces';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const schema = object({
  username: string().required('Username required').min(3),
  password: string()
    .required('Password required')
    .min(8)
    .matches(/[0-9]/, 'At least one digit')
    .matches(/[A-Z]/, 'At least one uppercase letter'),
}).required();

export function Register() {
  const { registerUser } = useAuth()
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
    registerUser(dataForm)
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
        <h2>Register</h2>
        <CustomInput
          label="Username"
          Icon={FiUser}
          {...register('username')}
          error={errors.username}
        />

        <CustomInput
          type={isShowingPassword ? 'text' : 'password'}
          label="Password (8 characters with at least one digit and one uppercase letter)"
          placeholder="Password"
          Icon={FiLock}
          {...register('password')}
          error={errors.password}
          isPassword={true}
          showPassword={showPassword}
          isShowingPassword={isShowingPassword}
        />

        <Button title="Register" icon={<FiSave />} type="submit" />

        <Link className={styles.link} to="/">
          <span><FiArrowLeft /></span> Login
        </Link>
      </form>
    </div>
  );
}