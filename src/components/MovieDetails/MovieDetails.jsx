import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import { getMoviesById } from 'api/api';
import { useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

import styles from './movie-details.module.css';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';
const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=300x240';

const MovieDetails = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToCast = () => {
    const castElement = document.getElementById('cast');
    if (castElement) {
      castElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await getMoviesById(id);
        setMovies(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [id]);

  const from = location.state?.from || '/';
  const { poster_path, title, overview, genres, vote_average, release_date } =
    movies || {};
  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error:{error}</p>}
      <button
        onClick={() => {
          navigate(from);
        }}
        type="button"
        className={styles.btn}
      >
        {' '}
        Go Back{' '}
      </button>
      {movies ? (
        <div className={styles.wrap}>
          {movies && poster_path && (
            <img
              className={styles.img}
              src={poster_path ? BASE_URL + poster_path : defaultImg}
              alt={title}
            />
          )}
          <div>
            <h2 className={styles.article}>
              {title} {'('}
              {release_date.split('-')[0]}
              {')'}
            </h2>
            <span>User Score: {Math.floor(vote_average * 10)}%</span>
            <h3 className={styles.title}>Overview</h3>
            <p>{overview}</p>
            <h3 className={styles.title}>Genres</h3>
            <ul className={styles.list}>
              {genres?.length &&
                genres.map(genre => (
                  <li className={styles.item} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className={styles.additional}>
        <h3>Additional information</h3>
        <ul className={styles.add}>
          <NavLink
            className={`${styles.link} ${styles.cast}`}
            to="cast"
            state={{ from: from }}
            onClick={scrollToCast}
          >
            <span>Cast</span>
          </NavLink>
          <NavLink
            className={`${styles.link} ${styles.reviews}`}
            to="reviews"
            state={{ from: from }}
          >
            <span>Reviews</span>
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
