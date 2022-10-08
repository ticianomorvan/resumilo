import { FieldError, UseFormRegister } from 'react-hook-form';
import {
  container,
  input,
  label as styledLabel,
  error as styledError,
} from 'styles/components/input.css';

interface Props {
  name: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

export default function Input({
  name, label, register, error,
}: Props) {
  return (
    <div className={container}>
      <label htmlFor={name}>
        <p className={styledLabel}>{label}</p>
        <input
          className={input}
          type="text"
          {...register(name)}
        />
      </label>

      {error && <p className={styledError}>{error.message}</p>}
    </div>
  );
}
