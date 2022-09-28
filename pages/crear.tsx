import * as Yup from "yup";
import { format } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast } from "../lib/utils";
import { useUser } from "../context/user_context";
import { nanoid } from "nanoid";

// Components
import BaseLayout from "../components/layouts/BaseLayout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Summary } from "../types/summary";
import Link from "next/link";

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
  const toast = useToast();
  const router = useRouter();

  if (!user)
    return (
      <>
        <Text>No iniciaste sesión.</Text>
        <Link href="/login">
          <Text color="green.500" cursor="pointer" textDecoration="underline">
            Hazlo haciendo click aquí.
          </Text>
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

    if (!resumenDocument)
      return toast(errorToast("Tienes que subir un archivo .docx o .pdf."));
    if (resumenDocument.size > TEN_MEGABYTES_LIMIT)
      return toast(errorToast("El archivo tiene que ser inferior a 10 MB."));

    const { createSummaryRef, createSummaryDoc } = await import(
      "../lib/firebase"
    );

    const { uploadBytes } = await import("firebase/storage");

    const storageRef = await createSummaryRef(resumenDocument);

    try {
      const { ref } = await uploadBytes(storageRef, resumenDocument);

      const summary: Summary = {
        id: nanoid(),
        title,
        description,
        topic,
        author_id: user.uid,
        date: format(new Date(), "yyyy-MM-dd"),
        file_reference: ref.name,
      };
      await createSummaryDoc(summary);

      return toast({
        title: "¡Creaste un resumen!",
        description: `Fue designado con la ID: ${summary.id}`,
        status: "success",
        duration: 2000,
        onCloseComplete: () => router.push(`/resumenes/${summary.id}`),
      });
    } catch (error: any) {
      return toast(errorToast(error.message));
    } finally {
      reset({ title: "", description: "", file: undefined, topic: "" });
    }
  };

  return (
    <BaseLayout title="Creación | Resumilo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel htmlFor="title">Título</FormLabel>
          <Input id="title" {...register("title")} />

          <FormErrorMessage>
            {errors.title && <p>{errors.title.message}</p>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.description)}>
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Input id="description" {...register("description")} />

          <FormErrorMessage>
            {errors.description && <p>{errors.description.message}</p>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.topic)}>
          <FormLabel htmlFor="topic">Tema</FormLabel>
          <Input id="topic" {...register("topic")} />

          <FormErrorMessage>
            {errors.topic && <p>{errors.topic.message}</p>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.file)}>
          <FormLabel htmlFor="document">Documento</FormLabel>
          <Input
            id="document"
            type="file"
            accept="application/pdf, application/msword"
            {...register("file")}
          />

          <FormErrorMessage>
            {errors.file && <p>{errors.file.message}</p>}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Subir</Button>
      </form>
    </BaseLayout>
  );
};

export default Create;
