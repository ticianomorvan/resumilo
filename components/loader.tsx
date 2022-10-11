import { loader, loaderBackground } from 'styles/components/utils.css';

export default function Loader() {
  return (
    <div className={loaderBackground}>
      <span className={loader} />
    </div>
  );
}
