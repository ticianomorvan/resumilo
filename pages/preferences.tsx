import useUser from 'hooks/useUser';
import { updateUserProfile } from 'lib/pocketbase';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

// Styles
import { agreement, container, header } from 'styles/components/form.css';
import { thumb, thumbInner } from 'styles/components/dropzone.css';

// Components
import Input from 'components/forms/input';
import BaseLayout from 'components/layouts/base';
import Image from 'next/image';
import PreferencesDropzone from 'components/dropzone/preferences';
import Loader from 'components/loader';
import Profile from 'components/profile';
import Button from 'components/button';

interface DropzoneFile extends File {
  preview: string,
}

function Thumb({ file }: { file: DropzoneFile }) {
  return (
    <span className={thumb}>
      <p>Vista previa</p>
      <div className={thumbInner}>
        <Image
          objectFit="cover"
          src={file.preview}
          alt={file.name}
          width={100}
          height={100}
        />
      </div>
    </span>
  );
}

export default function Preferences() {
  const { user } = useUser();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [files, setFiles] = useState<DropzoneFile[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>();

  useEffect(() => () => files.forEach((file) => URL.revokeObjectURL(file.preview)), [files]);

  if (!user || !user.profile) return <Loader />;

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
      name: data.name ?? user.profile.name,
      avatar: files.length > 0 ? files.at(0) : user.profile.avatar,
    };

    toast.promise(updateUserProfile(user.profile.id, newUserProfile), {
      loading: 'Actualizando tus preferencias...',
      success: 'Tus preferencias se actualizaron correctamente.',
      error: 'Hubo un error al actualizar tus preferencias.',
    });
  };

  return (
    <BaseLayout title="Perfil">
      <Profile data={user} />
      <h2 className={header}>Actualizá tus preferencias</h2>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          name="name"
          error={errors.name}
          register={register}
        />

        <PreferencesDropzone dispatch={setFiles} />

        {files
          && files.map((file) => (
            <Thumb key={file.name} file={file} />
          ))}

        <label htmlFor="agreement" className={agreement}>
          Cambiar tus preferencias puede requerir volver a iniciar sesión, ¿estás de acuerdo?
          <input id="agreement" type="checkbox" onChange={() => setIsChecked(!isChecked)} />
        </label>

        {isChecked && (
          <Button variant="primary" submit wide>
            Actualizar
          </Button>
        )}
      </form>
    </BaseLayout>
  );
}
