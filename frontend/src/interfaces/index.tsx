import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IDataForm {
  username: string,
  password: string
}

export interface ICustomInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: IconType;
  isPassword?: boolean;
  error?: FieldError;
  showPassword?: () => void;
  isShowingPassword?: boolean;
}