import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { createResumen } from "../../lib/backend";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

type Inputs = {
  name: string;
  content: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere un nombre.")
    .max(255, "El largo máximo del nombre es de 255 caracteres."),
  content: Yup.string().required("Se requiere contenido."),
});

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newResumen = {
      name: data.name,
      content: data.content,
      date: new Date(),
    };

    createResumen(newResumen);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            id="name"
            placeholder="El título del resumen"
            {...register("name")}
          />

          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors.content)}>
          <FormLabel htmlFor="content">Contenido</FormLabel>
          <Textarea
            id="content"
            placeholder="El contenido del resumen"
            {...register("content")}
          />

          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Enviar</Button>
      </form>
    </Box>
  );
};

export default Create;
