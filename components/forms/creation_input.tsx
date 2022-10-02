import { FieldError, UseFormRegister } from "react-hook-form";
import { creationInputStyles } from "styles/components.css";

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

export default function CreationInput({
  inputName,
  label,
  register,
  error,
}: Props) {
  return (
    <div className={creationInputStyles.container}>
      <label htmlFor={inputName}>
        <p className={creationInputStyles.label}>{label}</p>
        <input
          className={creationInputStyles.input}
          type="text"
          {...register(inputName)}
        />
      </label>

      {error && <p className={creationInputStyles.error}>{error.message}</p>}
    </div>
  );
}
