import { FieldError, UseFormRegister } from "react-hook-form";

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
    <div className="my-4">
      <label htmlFor={inputName}>
        <p className="text-lg py-2">{label}</p>
        <input
          className="w-full p-1 rounded-md border-black border-[1px] focus:outline-green-500"
          type="text"
          {...register(inputName)}
        />
      </label>

      {error && (
        <p className="bg-red-100 text-red-900 p-2 my-2 rounded-lg">
          {error.message}
        </p>
      )}
    </div>
  );
}
