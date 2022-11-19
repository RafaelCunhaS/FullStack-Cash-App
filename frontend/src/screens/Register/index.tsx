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
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { IDataForm } from '../../interfaces';
import { Button } from '../../components/Button';

const schema = object({
  username: string().required('Username obrigatório').min(3, 'No mínimo 3 caracteres'),
  password: string()
    .required('Senha obrigatória')
    .min(8, 'No mínimo 8 caracteres')
    .matches(/[0-9]/, 'Pelo menos um dígito')
    .matches(/[A-Z]/, 'Pelo menos uma letra maiúscula'),
}).required();

export function Register() {
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
      const response = await api.post('/register', dataForm);
      if (response.status === 201) {
        toast.success('Usuário cadastrado(a) com sucesso');
        navigate('/');
      }
    } catch (error: any) {
      toast.warning(error?.response?.data?.error);
      console.log(error);
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
        <h2>Cadastrar</h2>
        <CustomInput
          label="Username"
          Icon={FiUser}
          {...register('username')}
          error={errors.username}
        />

        <span>*8 caracteres com pelo menos 1 dígito e uma letra maiúscula</span>
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

        <Button title="Cadastrar" icon={<FiSave />} type="submit" />

        <Link className={styles.link} to="/">
          <FiArrowLeft /> Voltar para Login
        </Link>
      </form>
    </div>
  );
}