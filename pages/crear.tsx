import * as Yup from "yup";
import { format } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadBytes } from "firebase/storage";
import { Summary } from "../types/summary";
import { errorToast } from "../lib/utils";
import { nanoid } from "nanoid";

// Components
import BaseLayout from "../components/layouts/BaseLayout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "../context/user_context";

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
  id: string;
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

  if (!user) return <p>Cargando...</p>;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const resumenDocument = data.file.item(0); // Get the selected file from the input.

    if (!resumenDocument) {
      return toast({
        title: "No elegiste ningún archivo para subir.",
        description: "Tip: ¡Puedes subir archivos .pdf o .docx de hasta 10 MB!",
        status: "info",
        isClosable: true,
      });
    }

    if (resumenDocument.size > TEN_MEGABYTES_LIMIT)
      return alert("El archivo tiene que ser inferior a 10 MB.");

    const { firebase, createSummaryRef, createSummaryDoc } = await import(
      "../lib/firebase"
    );

    const storageRef = createSummaryRef(firebase, resumenDocument);

    uploadBytes(storageRef, resumenDocument)
      .then((snapshot) => {
        if (snapshot) {
          const newSummary: Summary = {
            id: nanoid(),
            title: data.title,
            description: data.description,
            topic: data.topic,
            author_id: user.uid,
            file_reference: snapshot.ref.name,
            date: format(new Date(), "yyyy-MM-dd"),
          };

          createSummaryDoc(firebase, newSummary)
            .then(() =>
              toast({
                title: "¡Tu resumen se subió correctamente!",
                status: "success",
                duration: 2000,
              })
            )
            .catch((error) => toast(errorToast(error)));

          reset({
            title: "",
            description: "",
            topic: "",
          });
        }
      })
      .catch((error) => toast(errorToast(error)));
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
