import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import styles from './Recipe.module.scss';
import { PostSkeleton } from './Skeleton';
import { fetchRemoveRecipe } from '../../redux/slices/recipes';

export const Post = ({
  id,
  name,
  coockingTime,
  createdAt,
  imageUrl,
  description,
  ingridients,
  children,
  isFullPost,
  isLoading,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = (id) => {
    if (window.confirm('Вы действительно хотите удалить рецепт?')) {
      dispatch(fetchRemoveRecipe(id));
    }
  };
  const dayName = new Date(createdAt).toLocaleDateString('ru-RU');

  console.log(imageUrl);
  return (
    <Grid item xs={4}>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={styles.editButtons}>
          <Link to={`/recipe/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => onClickRemove(id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        {imageUrl && (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={name}
          />
        )}
        <div className={styles.wrapper}>
          <div className={styles.indention}>
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? name : <Link to={`/recipe/${id}`}>{name}</Link>}
            </h2>
            {children && <div className={styles.content}>{children}</div>}
            <ul className={clsx(styles.tags, { [styles.tagsFull]: isFullPost })}>
              <h4>Ингридиенты:</h4>
              {ingridients.map((name) => (
                <li className={styles.ingridients} key={name}>
                  <Link to="#">{name}</Link>
                </li>
              ))}
            </ul>
            <h5 className={styles.coockingTime}>Время приготовления: {coockingTime}</h5>
            <div style={{ 'text-align': 'center' }}>
              <span>{dayName}</span>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};
