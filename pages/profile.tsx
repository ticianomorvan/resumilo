import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "hooks/useUser";
import { updateUserProfile } from "lib/pocketbase";
import { useForm, SubmitHandler } from "react-hook-form";
import { mixed, object, string } from "yup";
import Button from "components/button";
import Input from "components/forms/input";
import BaseLayout from "components/layouts/layout";
import toast from "react-hot-toast";

interface Inputs {
  name: string;
  avatar: FileList;
}

const validationSchema = object().shape({
  name: string()
    .required("Se necesita un nombre.")
    .min(4, "Tiene que tener un mínimo de cuatro caracteres."),
  avatar: mixed().required("Se necesita un avatar"),
});

export default function Profile() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newUserProfile = {
      name: data.name,
      avatar: data.avatar.item(0)!,
    };

    if (!user || !user.profile) toast.error("No tienes una cuenta.");
    else {
      toast.promise(updateUserProfile(user.profile.id, newUserProfile), {
        loading: "Actualizando tus preferencias...",
        success: "Tus preferencias se actualizaron correctamente.",
        error: "Hubo un error al actualizar tus preferencias.",
      });
    }
  };

  return (
    <BaseLayout title="Perfil">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          name="name"
          error={errors.name}
          register={register}
        />

        <div>
          <p>Documento</p>
          <input
            id="document"
            type="file"
            accept="image/png, image/jpg"
            {...register("avatar")}
          />

          {errors.avatar && <p>{errors.avatar.message}</p>}
        </div>

        <Button variant="ghost" type="submit">
          Actualizar
        </Button>
      </form>
    </BaseLayout>
  );
}
