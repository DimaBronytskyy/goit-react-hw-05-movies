import MovieDetails from '../../components/MovieDetails/MovieDetails';

import styles from './movie-details-page.module.css';

const MovieDetailsPage = () => {
  return (
    <div className={styles.back}>
      <MovieDetails />
    </div>
  );
};

export default MovieDetailsPage;
