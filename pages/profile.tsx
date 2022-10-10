import { yupResolver } from '@hookform/resolvers/yup';
import useUser from 'hooks/useUser';
import { updateUserProfile } from 'lib/pocketbase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';
import { useDropzone } from 'react-dropzone';
import { TEN_MEBIBYTES_LIMIT } from 'lib/utils';
import toast from 'react-hot-toast';

// Components
import Button from 'components/button';
import Input from 'components/forms/input';
import BaseLayout from 'components/layouts/base';
import {
  container, dropzone, footNote, header,
} from 'styles/components/form.css';
import { FaInfoCircle } from 'react-icons/fa';

const validationSchema = object().shape({
  name: string()
    .required('Se necesita un nombre.')
    .min(4, 'Tiene que tener un mínimo de cuatro caracteres.'),
});

export default function Profile() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ resolver: yupResolver(validationSchema) });

  const {
    acceptedFiles, getRootProps, getInputProps,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    noClick: true,
    maxSize: TEN_MEBIBYTES_LIMIT,
    onDropRejected: (fileRejections) => toast.error('El archivo ingresado no es del tipo .jpg o .png', {
      id: fileRejections.at(0)?.file.name,
    }),
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    const newUserProfile = {
      name: data.name,
      avatar: acceptedFiles.length > 0 ? acceptedFiles.at(0) : user?.profile?.avatar,
    };

    if (!user || !user.profile) toast.error('No tienes una cuenta.');
    else {
      toast.promise(updateUserProfile(user.profile.id, newUserProfile), {
        loading: 'Actualizando tus preferencias...',
        success: 'Tus preferencias se actualizaron correctamente.',
        error: 'Hubo un error al actualizar tus preferencias.',
      });
    }
  };

  return (
    <BaseLayout title="Perfil">
      <h1 className={header}>Actualizá tus preferencias</h1>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          name="name"
          error={errors.name}
          register={register}
        />

        <div {...getRootProps({ className: dropzone })}>
          <input {...getInputProps()} />
          <p>Arrastra tu foto de perfil aquí o haz click para abrir el explorador.</p>
        </div>

        <span className={footNote}>
          <FaInfoCircle />
          <p>Debe ser un archivo .png o .jpg de menos de 10 MB</p>
        </span>

        {acceptedFiles.map((file) => (
          <p key={file.name}>
            {file.name}
            {' '}
            |
            {' '}
            {file.size}
          </p>
        ))}

        <Button variant="ghost" submit wide>
          Actualizar
        </Button>
      </form>
    </BaseLayout>
  );
}
