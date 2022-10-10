import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { createSummary } from 'lib/pocketbase';
import { Summary } from 'types/summary';
import { redirect, TEN_MEBIBYTES_LIMIT } from 'lib/utils';

// react-hook-form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

// Hooks
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';

// Styles

import {
  container,
  notLoggedIn,
} from 'styles/pages/crear.css';

import {
  header,
  fileUpload,
  formContainer,
  uploadButton,
  uploadMessage,
} from 'styles/components/form.css';

// Components
import Link from 'next/link';
import Input from 'components/forms/input';
import BaseLayout from 'components/layouts/base';
import Button from 'components/button';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Se necesita un título.')
    .min(12, 'Debe tener al menos doce carácteres.'),
  description: Yup.string().notRequired(),
  topic: Yup.string()
    .required('Se necesita un tema.')
    .max(24, 'No puede tener más de 24 caracteres.'),
  file_reference: Yup.array().length(1, 'Se requiere un archivo .pdf o .docx'),
});

interface Inputs {
  title: string;
  description: string;
  topic: string;
  file: FileList;
}

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <div className={notLoggedIn.container}>
        <p className={notLoggedIn.message}>No iniciaste sesión.</p>
        <Link href="/login">
          <p className={notLoggedIn.link}>Hazlo haciendo click aquí.</p>
        </Link>
      </div>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    description,
    file,
    topic,
  }) => {
    const summaryDocument = file.item(0); // Get the selected file from the input.

    if (!summaryDocument) {
      toast.error('Tienes que subir un archivo .docx o .pdf.', {
        duration: 3000,
      });
    } else if (summaryDocument.size > TEN_MEBIBYTES_LIMIT) {
      toast.error('No puedes subir un archivo de más de 10 MB', {
        duration: 3000,
      });
    } else {
      const summary: Summary = {
        id: '', // Leaving it blank will tell Pocketbase to create a random ID.
        title,
        description,
        author: user.id,

        // Format the date to be YEAR-MONTH-DAY HOUR:MINUTE:SECOND
        date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
        document: summaryDocument,
        topic,
      };

      toast
        .promise(createSummary(summary), {
          loading: 'Creando el resumen...',
          error: 'Hubo un error inesperado.',
          success: '¡Resumen creado correctamente! Redirigiéndote al inicio...',
        })
        .catch((error) => toast.error(error))
        .finally(() => redirect({
          router, destination: '/resumenes',
        }));
    }
  };

  return (
    <BaseLayout title="Creación">
      <div className={container}>
        <h1 className={header}>Creá un resumen</h1>

        <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="title"
            label="Título"
            register={register}
            error={errors.title}
          />

          <Input
            name="description"
            label="Descripción"
            register={register}
            error={errors.description}
          />

          <Input
            name="topic"
            label="Tema"
            register={register}
            error={errors.topic}
          />

          <div className={fileUpload.container}>
            <p className={fileUpload.label}>Documento</p>
            <input
              id="document"
              className={fileUpload.input}
              type="file"
              accept="application/pdf, application/msword"
              {...register('file')}
            />
            <p className={fileUpload.footnote}>
              .pdf o .docx de menos de 10 MB.
            </p>

            {errors.file && <p>{errors.file.message}</p>}
          </div>

          <p className={uploadMessage}>¿Todo listo?</p>
          <Button otherClasses={uploadButton} submit>
            Subir
          </Button>
        </form>
      </div>
    </BaseLayout>
  );
}

export default Create;
