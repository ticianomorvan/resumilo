import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  container,
  input,
  label as styledLabel,
  error as styledError,
  showPassword,
  passwordInput,
} from 'styles/components/input.css';

interface Props {
  name: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

export default function PasswordInput({
  name, label, register, error,
}: Props) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={container}>
      <label htmlFor={name}>
        <p className={styledLabel}>{label}</p>

        <span className={passwordInput}>
          <input
            className={input}
            type={isHidden ? 'password' : 'text'}
            {...register(name)}
          />
          <button className={showPassword} type="button" onClick={() => setIsHidden((c) => !c)}>
            {isHidden ? <FaEyeSlash /> : <FaEye />}
          </button>
        </span>
      </label>

      {error && <p className={styledError}>{error.message}</p>}

    </div>
  );
}
