import { TEN_MEBIBYTES_LIMIT } from 'lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaInfoCircle } from 'react-icons/fa';
import { dropzone, footNote } from 'styles/components/dropzone.css';
import { icon } from 'styles/components/utils.css';
import toast from 'react-hot-toast';

interface Props {
  dispatch: Dispatch<SetStateAction<File[]>>
}

export default function DocumentDropzone({ dispatch }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
    maxSize: TEN_MEBIBYTES_LIMIT,
    onDrop: (acceptedFiles) => dispatch(acceptedFiles),
    onDropRejected: (fileRejections) => {
      const rejectedFile = fileRejections.at(0);
      if (rejectedFile?.errors.at(0)?.message.includes('bytes')) {
        toast.error('El archivo supera los 10 MB.');
      } else {
        toast.error('No es un archivo PDF o DOCX');
      }
    },
  });

  return (
    <>
      <div {...getRootProps({ className: dropzone })}>
        <input {...getInputProps()} />
        <p>Arrastra aquí to resumen o haz click para abrir el explorador</p>
        <FaFilePdf className={icon} />
      </div>

      <span className={footNote}>
        <FaInfoCircle className={icon} />
        <p>Debe ser un archivo .pdf o .docx de menos de 10 MB</p>
      </span>
    </>
  );
}
