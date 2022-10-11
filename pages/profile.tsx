import useUser from 'hooks/useUser';
import { updateUserProfile } from 'lib/pocketbase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { TEN_MEBIBYTES_LIMIT } from 'lib/utils';
import toast from 'react-hot-toast';

// Components
import Button from 'components/button';
import Input from 'components/forms/input';
import BaseLayout from 'components/layouts/base';
import {
  container, dropzone, footNote, header, thumb, thumbInner,
} from 'styles/components/form.css';
import { FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface DropzoneFile extends File {
  preview: string,
}

function Thumb({ file }: { file: DropzoneFile }) {
  return (
    <span className={thumb}>
      <p>Vista previa</p>
      <div className={thumbInner}>
        <Image
          src={file.preview}
          alt={file.name}
          width={100}
          height={100}
        />
      </div>
    </span>
  );
}

export default function Profile() {
  const { user } = useUser();
  const [files, setFiles] = useState<DropzoneFile[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    maxSize: TEN_MEBIBYTES_LIMIT,
    onDrop: (acceptedFiles) => setFiles(
      acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })),
    ),
    onDropRejected: (fileRejections) => toast.error('El archivo ingresado no es del tipo .jpg o .png', {
      id: fileRejections.at(0)?.file.name,
    }),
  });

  // First of all, if the user does have a profile, do the process.
  // If the user doesn't have an avatar already, use the one that uploads.
  // But, if the user doesn't want to change their avatar, keep the previous one.
  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    if (!user || !user.profile) {
      toast.error('No tienes una cuenta.');
      return;
    }
    if (!data.name && files.length === 0) {
      toast('No cambiaste ninguna de tus preferencias.');
      return;
    }

    if (data.name.length > 0 && data.name.length < 4) {
      toast.error('El nuevo nombre debe tener más de cuatro caracteres.');
      return;
    }

    const newUserProfile = {
      name: data.name,
      avatar: files.length > 0 ? files.at(0) : user?.profile?.avatar,
    };

    toast.promise(updateUserProfile(user.profile.id, newUserProfile), {
      loading: 'Actualizando tus preferencias...',
      success: 'Tus preferencias se actualizaron correctamente.',
      error: 'Hubo un error al actualizar tus preferencias.',
    });
  };

  useEffect(() => () => files.forEach((file) => URL.revokeObjectURL(file.preview)), [files]);

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

        {files
          && files.map((file) => (
            <Thumb key={file.name} file={file} />
          ))}

        <Button variant="ghost" submit wide>
          Actualizar
        </Button>
      </form>
    </BaseLayout>
  );
}
