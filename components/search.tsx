import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';
import * as styles from 'styles/components/search.css';
import { error } from 'styles/components/input.css';
import { FaLightbulb, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { SummaryRecord } from 'types/summary';
import toast from 'react-hot-toast';
import { searchSummaries } from 'lib/pocketbase';
import SummaryItem from './summary';

interface Inputs {
  query: string
}

const validationSchema = object().shape({
  query: string()
    .required('Se necesita un criterio de búsqueda.')
    .min(3, 'Se necesitan al menos tres caracteres para buscar.'),
});

export default function Search() {
  const [summaries, setSummaries] = useState<SummaryRecord[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = ({ query }) => {
    toast.promise(searchSummaries(query), {
      loading: 'Buscando resúmenes...',
      success: '¡Se encontraron resúmenes con tu búsqueda!',
      error: 'Hubo un error en la operación',
    }, {
      position: 'bottom-center',
    }).then((records) => setSummaries(records));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.searchContainer}>
          <span className={styles.inputContainer}>
            <input className={styles.input} {...register('query')} />
            <button className={styles.button} type="submit">
              <FaSearch />
            </button>
          </span>

          <span className={styles.note}>
            <FaLightbulb />
            <p>
              Ayuda: podés buscar tanto por el título como por el tema del resumen.
            </p>
          </span>

          {errors.query && <p className={error}>{errors.query.message}</p>}
        </div>
      </form>

      {summaries.length >= 1
        && (
          <div className={styles.results}>
            {summaries.map((summary) => (
              <SummaryItem key={summary.id} data={summary} />
            ))}
          </div>
        )}
    </div>
  );
}
