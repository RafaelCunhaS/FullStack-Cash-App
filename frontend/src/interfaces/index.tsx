import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IDataForm {
  username: string;
  password: string;
}

export interface ICustomInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: IconType;
  isPassword?: boolean;
  error?: FieldError;
  showPassword?: () => void;
  isShowingPassword?: boolean;
}

export interface IUser {
  token: string;
  username: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IPayload {
  data: {
    id: number;
    username: string;
  }
}

export interface IAuthContextData {
  user: IUser;
  signIn: (credential: ISignIn) => Promise<void>;
  signOut: () => void;
  registerUser: (credential: ISignIn) => Promise<void>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IHeader {
  balance: number;
}

export interface INewTransaction {
  username: string;
  value: number;
}

export interface ITransactionSent {
  setTransactionSent: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ITransactions {
  id: number;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
  debitedUser: {
    username: string
  },
  creditedUser: {
    username: string
  }
}