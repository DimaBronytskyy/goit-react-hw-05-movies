import MoviesSearch from 'components/MoviesSearch/MovieSearch';
import styles from './movies-page.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies } from 'api/api';
import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  let page = Number(searchParams.get('page'));

  useEffect(() => {
    if (!search) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await getSearchMovies(search, page);
        setMovies(prevMovies =>
          data.results?.length ? [...prevMovies, ...data.results] : prevMovies
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // if (search && (page === 1 || !page)) {
    fetchMovies();
    // }
  }, [search, page, searchParams]);

  const handleSearch = ({ search }) => {
    setSearchParams({ search, page: 1 });
    setMovies([]);
  };

  // console.log(typeof(page));
  // const loadMore = () => setSearchParams({ search, page: Number(page) + 1 });
  const loadMore = () => {
    const nextPage = page + 1;
    // console.log('nextPage=', nextPage);
    // console.log('Index-nextPage=', typeof nextPage);
    setSearchParams({ search, page: nextPage });
    //  getSearchMovies(search, page);
  };
  const isMovies = Boolean(movies.length);
  const isMoreMovies = Boolean(movies.length % 20 === 0);

  return (
    <div>
      <MoviesSearch onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isMovies && <MoviesList movies={movies} />}
      {isMovies && isMoreMovies && (
        <div className={styles.loadMore}>
          <Button className={styles.button} onClick={loadMore} type="button">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
export default MoviesPage;
