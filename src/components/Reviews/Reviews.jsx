// import MovieDetails from 'components/MovieDetails/MovieDetails';
import { getMovieReviews } from 'api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import styles from './review.module.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const { data } = await getMovieReviews(id);
        // console.log('Reviews: ', data);
        setReviews(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!id) return;
    fetchCast();
  }, [id]);

  const elements = reviews.map(({ id, author, content }) => (
    <li key={id}>
      <h4 className={styles.title}>{author}</h4>
      <p>{content}</p>
    </li>
  ));

  const isReview = Boolean(reviews.length);

  return (
    <div className={styles.back}>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {<h2 className={styles.reviewsTitle}>Reviews</h2>}
      {isReview && <ul className={styles.list}>{elements}</ul>}
      {!isReview && <p className={styles.not}>No reviews available</p>}
    </div>
  );
};

export default ReviewsPage;
