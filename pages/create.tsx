import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/storage";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Resumen } from "../types/resumen";
import { format } from "date-fns";
import { useAuth } from "../hooks/useAuth";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../lib/firestore";
import BaseLayout from "../components/layouts/BaseLayout";

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
  mercado_pago: string;
  file: FileList;
}

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { user } = useAuth();

  if (!user) return <p>Cargando...</p>;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const resumenDocument = data.file.item(0)!;

    console.log(resumenDocument.size);

    if (resumenDocument.size > TEN_MEGABYTES_LIMIT)
      return alert("El archivo tiene que ser inferior a 10 MB.");

    const storageRef = ref(storage, `resumenes/${resumenDocument.name}`);

    uploadBytes(storageRef, resumenDocument)
      .then((snapshot) => {
        if (snapshot) {
          const newResumen: Resumen = {
            title: data.title,
            description: data.description,
            topic: data.topic,
            author: {
              name: user.displayName ?? "",
              avatar: user.photoURL ?? "",
              mercado_pago: data.mercado_pago ?? "",
            },
            file_reference: snapshot.ref.name,
            date: format(new Date(), "yyyy-MM-dd"),
          };

          setDoc(doc(collection(firestore, "resumenes")), newResumen)
            .then(() => alert("Document created"))
            .catch((error) => alert(error));

          reset({
            title: "",
            description: "",
            topic: "",
            file: undefined,
            mercado_pago: "",
          });
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <BaseLayout>
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

        <FormControl isInvalid={Boolean(errors.mercado_pago)}>
          <FormLabel htmlFor="mercado_pago">
            Link de pago (Mercado Pago)
          </FormLabel>
          <Input id="mercado_pago" {...register("mercado_pago")} />

          <FormErrorMessage>
            {errors.mercado_pago && <p>{errors.mercado_pago.message}</p>}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Subir</Button>
      </form>
    </BaseLayout>
  );
};

export default Create;
