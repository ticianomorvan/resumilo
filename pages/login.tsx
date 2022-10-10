import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authUser } from 'lib/pocketbase';
import { redirect } from 'lib/utils';

// Styles
import { container, header, signUpMessage } from 'styles/components/form.css';

// Components
import MinimalLayout from 'components/layouts/minimal';
import Link from 'next/link';
import Input from 'components/forms/input';
import PasswordInput from 'components/forms/password';
import Button from '../components/button';

const validationSchema = object().shape({
  email: string()
    .required('Se requiere un correo electrónico.')
    .email('Lo ingresado no corresponde a un correo electrónico.'),
  password: string()
    .required('Se requiere una contraseña.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
});

interface Inputs {
  email: string;
  password: string;
}

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    toast
      .promise(authUser(email, password), {
        loading: 'Iniciando sesión...',
        success: '¡Iniciaste sesión correctamente! Redirigiéndote...',
        error: 'Hubo un error al iniciar sesión.',
      })
      .catch((error) => toast.error(error))
      .finally(() => redirect({
        router, destination: '/resumenes',
      }));
  };

  return (
    <MinimalLayout title="Iniciar sesión">
      <h1 className={header}>Ingresá a Resumilo</h1>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Correo electrónico"
          name="email"
          register={register}
          error={errors.email}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          register={register}
          error={errors.password}
        />

        <Button submit wide>Entrar</Button>

        <Link href="/signup">
          <p className={signUpMessage}>¿No tienes una cuenta?</p>
        </Link>
      </form>
    </MinimalLayout>
  );
}

export default LogIn;
