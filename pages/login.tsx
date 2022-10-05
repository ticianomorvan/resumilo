import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

// Components
import { FaEye } from "react-icons/fa";
import BaseLayout from "components/layouts/layout";
import Button from "../components/button";
import Link from "next/link";
import { client } from "lib/pocketbase";
import { User } from "pocketbase";

const validationSchema = object().shape({
  email: string()
    .required("Se requiere un correo electrónico.")
    .email("Lo ingresado no corresponde a un correo electrónico."),
  password: string()
    .required("Se requiere una contraseña.")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

interface Inputs {
  email: string;
  password: string;
}

// Using valid credentials, request the API to create a session for the user and then persist it locally.
const LogIn = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/users/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json, charset=utf-8",
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const { token, user } = data as { token: string; user: User };
          client.authStore.save(token, user);
          toast.success("Iniciaste sesión correctamente, redireccionándote...");
          setTimeout(() => router.push("/"), 2000);
        });
      } else {
        toast.error("Hubo un error, inténtalo de nuevo.");
      }
    });
  };

  return (
    <BaseLayout title="Iniciar sesión">
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

        <Button type="submit">Entrar</Button>

        <Link href="/signup">¿No tienes una cuenta?</Link>
      </form>
    </BaseLayout>
  );
};

export default LogIn;
