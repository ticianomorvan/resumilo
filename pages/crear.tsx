import { Summary } from "../types/summary";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

// react-hook-form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

// Hooks
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";

// Components
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import Button from "../components/button";
import { FieldError, UseFormRegister } from "react-hook-form";
import { inputField } from "../styles/components.css";

const TEN_MEGABYTES_LIMIT = 10000000; // 10 MB to Byte conversion

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Se necesita un título.")
    .min(5, "El título debe tener al menos cinco carácteres."),
  description: Yup.string().notRequired(),
  topic: Yup.string().required("Se necesita un tema."),
  mercado_pago: Yup.string().notRequired(),
  file_reference: Yup.array().length(1, "Se requiere un archivo .pdf o .docx"),
});

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

function InputField({ inputName, label, register, error }: Props) {
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

interface Inputs {
  title: string;
  description: string;
  topic: string;
  file: FileList;
}

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { user } = useUser();

  if (!user)
    return (
      <>
        <p>No iniciaste sesión.</p>
        <Link href="/login">
          <p className="text-green-500 underline">Hazlo haciendo click aquí.</p>
        </Link>
      </>
    );

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    description,
    file,
    topic,
  }) => {
    const resumenDocument = file.item(0); // Get the selected file from the input.

    if (!resumenDocument) {
      toast.error("Tienes que subir un archivo .docx o .pdf.", {
        duration: 3000,
      });
    } else if (resumenDocument.size > TEN_MEGABYTES_LIMIT) {
      toast.error("No puedes subir un archivo de más de 10 MB", {
        duration: 3000,
      });
    } else {
      const { createSummaryRef, createSummaryDoc } = await import(
        "../lib/firebase"
      );

      const { uploadBytes } = await import("firebase/storage");

      const storageRef = await createSummaryRef(resumenDocument);

      try {
        const { ref } = await toast.promise(
          uploadBytes(storageRef, resumenDocument),
          {
            loading: "Subiendo documento...",
            success: "¡Documento subido con éxito!",
            error: "Hubo un error al subir tu documento.",
          }
        );

        const summary: Summary = {
          id: nanoid(),
          title,
          description,
          topic,
          author_id: user.uid,
          date: format(new Date(), "yyyy-MM-dd"),
          file_reference: ref.name,
        };

        toast.promise(createSummaryDoc(summary), {
          loading: `Creando resumen: ${summary.title}`,
          success: `¡Resumen creado!`,
          error: `Hubo un error al crear tu resumen.`,
        });
      } catch (error: any) {
        toast.error(error, { duration: 3000 });
      } finally {
        reset({ title: "", description: "", file: undefined, topic: "" });
      }
    }
  };

  return (
    <BaseLayout title="Creación | Resumilo">
      <div className="grid justify-items-center lg:grid-cols-2 lg:w-3/4 lg:items-center mt-[16em] lg:mt-[8em] xl:mt-0">
        <h1 className="text-center">Creá un resumen</h1>

        <form
          className="w-[90%] px-3 border-black border-2 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            inputName="title"
            label="Título"
            register={register}
            error={errors.title}
          />

          <InputField
            inputName="description"
            label="Descripción"
            register={register}
            error={errors.description}
          />

          <InputField
            inputName="topic"
            label="Tema"
            register={register}
            error={errors.topic}
          />

          <div className="my-2">
            <label className="flex flex-col gap-y-2" htmlFor="document">
              <p>Documento</p>
              <input
                id="document"
                className="w-full file:mr-4 file:bg-green-100 file:border-none file:p-2 file:rounded-lg hover:file:bg-green-200 hover:file:cursor-pointer"
                type="file"
                accept="application/pdf, application/msword"
                {...register("file")}
              />
            </label>
            <p className="py-2 text-gray-600">
              .pdf o .docx de menos de 10 MB.
            </p>

            {errors.file && <p>{errors.file.message}</p>}
          </div>

          <Button type="submit">Subir</Button>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Create;
