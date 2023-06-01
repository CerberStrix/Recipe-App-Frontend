import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import logo from '../../assets/icon.png';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <img width="54" height="54" src={logo} alt="logo" />
            <div>
              <h1>My react recipes</h1>
            </div>
          </Link>
          <div className={styles.buttons}>
            <Link to="/add-recipe">
              <Button variant="contained">Добавить рецепт</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
