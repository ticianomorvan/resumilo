import { Summary } from "../types/summary";
import { format } from "date-fns";
import toast from "react-hot-toast";

// react-hook-form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

// Hooks
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";

import {
  container,
  fileUpload,
  formContainer,
  header,
  notLoggedIn,
  uploadButton,
  uploadMessage,
} from "styles/crear.css";

// Components
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import Button from "../components/button";
import CreationInput from "components/forms/creation_input";
import { createSummary } from "lib/pocketbase";

const TEN_MEBIBYTES_LIMIT = 10485760; // 10 MB to Byte conversion

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Se necesita un título.")
    .min(12, "Debe tener al menos doce carácteres."),
  description: Yup.string().notRequired(),
  topic: Yup.string()
    .required("Se necesita un tema.")
    .max(24, "No puede tener más de 24 caracteres."),
  file_reference: Yup.array().length(1, "Se requiere un archivo .pdf o .docx"),
});

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
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { user } = useUser();
  const router = useRouter();

  if (!user)
    return (
      <div className={notLoggedIn.container}>
        <p className={notLoggedIn.message}>No iniciaste sesión.</p>
        <Link href="/login">
          <p className={notLoggedIn.link}>Hazlo haciendo click aquí.</p>
        </Link>
      </div>
    );

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    description,
    file,
    topic,
  }) => {
    const summaryDocument = file.item(0); // Get the selected file from the input.

    if (!summaryDocument) {
      toast.error("Tienes que subir un archivo .docx o .pdf.", {
        duration: 3000,
      });
    } else if (summaryDocument.size > TEN_MEBIBYTES_LIMIT) {
      toast.error("No puedes subir un archivo de más de 10 MB", {
        duration: 3000,
      });
    } else {
      const summary: Summary = {
        title: title,
        description: description,
        author: user.profile?.id!,

        // Format the date to be YEAR-MONTH-DAY HOUR:MINUTE:SECOND
        date: format(new Date(), "yyyy-MM-dd kk:mm:ss"),
        document: summaryDocument,
        topic: topic,
      };

      toast
        .promise(createSummary(summary), {
          loading: "Creando el resumen...",
          error: "Hubo un error inesperado.",
          success: "¡Resumen creado correctamente! Redirigiéndote al inicio...",
        })
        .then(() => setTimeout(() => router.push("/"), 2500));
    }
  };

  return (
    <BaseLayout title="Creación | Resumilo">
      <div className={container}>
        <h1 className={header}>Creá un resumen</h1>

        <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
          <CreationInput
            inputName="title"
            label="Título"
            register={register}
            error={errors.title}
          />

          <CreationInput
            inputName="description"
            label="Descripción"
            register={register}
            error={errors.description}
          />

          <CreationInput
            inputName="topic"
            label="Tema"
            register={register}
            error={errors.topic}
          />

          <div className={fileUpload.container}>
            <p className={fileUpload.label}>Documento</p>
            <input
              id="document"
              className={fileUpload.input}
              type="file"
              accept="application/pdf, application/msword"
              {...register("file")}
            />
            <p className={fileUpload.footnote}>
              .pdf o .docx de menos de 10 MB.
            </p>

            {errors.file && <p>{errors.file.message}</p>}
          </div>

          <p className={uploadMessage}>¿Todo listo?</p>
          <Button otherClasses={uploadButton} type="submit" variant="primary">
            Subir
          </Button>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Create;
