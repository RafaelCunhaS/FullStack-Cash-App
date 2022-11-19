import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { api } from '../services/api';
import { IAuthContextData, IAuthProviderProps, IPayload, ISignIn, IUser } from '../interfaces';

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return signOut();
    setInformation(token);
  }, []);

  async function signIn({ username, password }: ISignIn) {
    try {
      const { data } = await api.post('/login', {
        username,
        password,
      });

      if (!data.error && data.token) {
        setInformation(data.token);
      } else {
        toast.warning('E-mail ou senha incorreto');
      }
    } catch (error) {
      toast.warning('E-mail ou senha incorreto');
    }
  }

  async function registerUser({ username, password }: ISignIn) {
    try {
      const { data } = await api.post('/user', {
        username,
        password,
      });
      if (!data.error && data.token) {
        toast.success('Usuário cadastrado(a) com sucesso');
        setInformation(data.token);
      } else {
        toast.warning('Nome de usuário já cadastrado(a)');
      }
    } catch (error: any) {
      toast.warning('Nome de usuário já cadastrado(a)');
    }
  }

  function setInformation(token: string) {
    const { username } = jwt_decode(token) as IPayload;

    setUser({
      token: token,
      username: username,
    });

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    api.defaults.headers.common['Authorization'] = `${token}`;
    navigate('/home');
  }

  function signOut() {
    delete api.defaults.headers.common['Authorization'];

    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setUser({} as IUser);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };