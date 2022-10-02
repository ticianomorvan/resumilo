import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Components
import { FaEye } from "react-icons/fa";
import BaseLayout from "components/layouts/BaseLayout";
import Button from "../components/button";

const validationSchema = object().shape({
  email: string()
    .required("Se requiere un correo electrónico.")
    .email("Lo ingresado no corresponde a un correo electrónico."),
  password: string()
    .required("Se requiere una contraseña.")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  passwordConfirm: string().required(
    "Se requiere una confirmación de contraseña."
  ),
});

interface Inputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

/** SignUp page is exactly the same as LogIn, but it uses a different API endpoint, as well as has a confirm password step. */
const SignUp = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
    passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      toast.error("Las contraseñas no coinciden.");
    } else {
      const data = {
        email: email,
        password: password,
      };
      fetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json, charset=utf-8",
        }),
      }).then(({ status }) => {
        if (status === 200) {
          toast.success(
            "¡Tu usuario se creó correctamente!, redireccionándote..."
          );
          router.push("/resumenes");
        } else {
          toast.error("Hubo un error, inténtalo de nuevo.");
        }
      });
    }
  };

  return (
    <BaseLayout title="Registrarse">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Correo electrónico</p>
          <input type="email" {...register("email")} />

          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <span>
          <label>
            <p>Contraseña</p>
            <input
              type={isHidden ? "password" : "text"}
              {...register("password")}
            />

            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <FaEye onClick={() => setIsHidden((c) => !c)} />
        </span>

        <span>
          <label>
            <p>Confirmar contraseña</p>
            <input
              type={isHidden ? "password" : "text"}
              {...register("passwordConfirm")}
            />

            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <FaEye onClick={() => setIsHidden((c) => !c)} />
        </span>

        <Button type="submit">Registrarse</Button>
      </form>
    </BaseLayout>
  );
};

export default SignUp;
