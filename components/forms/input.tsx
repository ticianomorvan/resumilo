import { FieldError, UseFormRegister } from "react-hook-form";
import { creationInputStyles } from "styles/components/creation_input.css";

interface Props {
  name: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

export default function Input({ name, label, register, error }: Props) {
  return (
    <div className={creationInputStyles.container}>
      <label htmlFor={name}>
        <p className={creationInputStyles.label}>{label}</p>
        <input
          className={creationInputStyles.input}
          type="text"
          {...register(name)}
        />
      </label>

      {error && <p className={creationInputStyles.error}>{error.message}</p>}
    </div>
  );
}
