import MainMenu from 'components/MainMenu/MainMenu';
import styles from './shared-layout.module.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from 'components/Loader/Loader';

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <MainMenu />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
