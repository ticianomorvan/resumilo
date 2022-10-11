import { TEN_MEBIBYTES_LIMIT } from 'lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaImage, FaInfoCircle } from 'react-icons/fa';
import { dropzone, footNote } from 'styles/components/dropzone.css';
import toast from 'react-hot-toast';
import DropzoneImage from 'types/dropzone';
import { icon } from 'styles/components/utils.css';

interface Props {
  dispatch: Dispatch<SetStateAction<DropzoneImage[]>>
}

export default function PreferencesDropzone({ dispatch }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jgeg'],
    },
    maxSize: TEN_MEBIBYTES_LIMIT,
    onDrop: (acceptedFiles) => dispatch(
      acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })),
    ),
    onDropRejected: (fileRejections) => toast.error('No ingresaste una imagen .jpg o .png', { id: fileRejections.at(0)?.file.name }),
  });

  return (
    <>
      <div {...getRootProps({ className: dropzone })}>
        <input {...getInputProps()} />
        <p>Arrastra tu foto de perfil o haz click para buscarla.</p>
        <FaImage className={icon} />
      </div>

      <span className={footNote}>
        <FaInfoCircle className={icon} />
        <p>Debe ser un archivo .png o .jpg de menos de 10 MB</p>
      </span>
    </>
  );
}
