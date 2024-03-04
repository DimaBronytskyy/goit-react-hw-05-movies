import { useState, useEffect } from 'react';

import { getTrendingMovies } from 'api/api';
import Loader from '../Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';

import styles from './movie-trend.module.css';

const MoviesTrend = () => {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);

        const trendMovies = await getTrendingMovies();
        const { results } = trendMovies.data;

        setTrend(results?.length ? results : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {Boolean(trend.length) && <MoviesList movies={trend} />}
    </>
  );
};

export default MoviesTrend;
