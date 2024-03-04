import MoviesTrend from 'components/MovieTrend/MovieTrend';
import styles from './home-page.module.css';

const HomePage = () => {
  return (
    <div className={styles.back}>
      <h2 className={styles.text}>Trending today</h2>
      <MoviesTrend />
    </div>
  );
};

export default HomePage;
