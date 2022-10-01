import { FieldError, UseFormRegister } from "react-hook-form";
import { inputField } from "../styles/components.css";

interface Props {
  inputName: "title" | "description" | "topic";
  label: string;
  error?: FieldError;
  register: UseFormRegister<{
    title: string;
    description: string;
    topic: string;
    file: FileList;
  }>;
}

export default function InputField({
  inputName,
  label,
  register,
  error,
}: Props) {
  return (
    <div className={inputField.container}>
      <label htmlFor={inputName}>
        <p className={inputField.label}>{label}</p>
        <input
          className={inputField.input}
          type="text"
          {...register(inputName)}
        />
      </label>

      {error && <p className={inputField.error}>{error.message}</p>}
    </div>
  );
}
