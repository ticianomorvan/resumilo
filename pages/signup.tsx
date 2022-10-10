import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { createUser } from 'lib/pocketbase';
import { redirect } from 'lib/utils';

// Styles
import { container, header } from 'styles/components/form.css';

// Components
import MinimalLayout from 'components/layouts/minimal';
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
  passwordConfirm: string().required(
    'Se requiere una confirmación de contraseña.',
  ),
});

interface Inputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

/**
 * SignUp page is exactly the same as LogIn, but it uses a different API endpoint,
 * as well as has a confirm password step.
 */
function SignUp() {
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
      toast.error('Las contraseñas no coinciden.');
    } else {
      toast
        .promise(createUser(email, password), {
          loading: 'Creando tu usuario...',
          success: '¡Creaste tu cuenta correctamente!',
          error: 'Hubo un problema al crear tu cuenta.',
        })
        .catch((error) => toast.error(error))
        .finally(() => redirect({
          router, destination: '/profile',
        }));
    }
  };

  return (
    <MinimalLayout title="Creá tu cuenta">
      <h1 className={header}>Creá tu cuenta</h1>
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

        <PasswordInput
          label="Repetir contraseña"
          name="passwordConfirm"
          register={register}
          error={errors.passwordConfirm}
        />

        <Button wide submit>Registrarse</Button>
      </form>
    </MinimalLayout>
  );
}

export default SignUp;
