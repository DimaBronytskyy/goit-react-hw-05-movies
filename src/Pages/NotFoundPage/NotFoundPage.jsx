import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <h2 className={styles.title}>Cannot found this page.</h2>
      <button className={styles.btn}>
        {' '}
        <Link className={styles.link} to="/">
          To Home page
        </Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
