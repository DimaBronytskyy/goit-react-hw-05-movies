import { useState, useEffect, useMemo, useRef } from 'react';
import { nanoid } from 'nanoid';

import styles from './movie-search.module.css';

const MoviesSearch = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({
      search: '',
    });
  };

  const searchId = useMemo(() => nanoid(), []);

  return (
    <form className={styles.group} onSubmit={handleSubmit}>
      <label htmlFor={searchId} className={styles.label}>
        Let's find movies{' '}
      </label>
      <input
        className={styles.input}
        id={searchId}
        ref={inputRef}
        name="search"
        value={state.search}
        onChange={handleChange}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search"
        required
      />
      <button className={styles.btn} type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

export default MoviesSearch;
