import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Recipe';
import { fetchRecipe } from '../redux/slices/recipes';

export const Home = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);

  const isRecipeLoading = recipes.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchRecipe());
  }, []);

  return (
    <>
      <h1>Все рецепты</h1>
      <Grid container spacing={2}>
        {(isRecipeLoading ? [...Array(5)] : recipes.items).map((obj, index) =>
          isRecipeLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              name={obj.name}
              ingridients={obj.ingridients}
              description={obj.description}
              coockingTime={obj.coockingTime}
              imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
              createdAt={obj.createdAt}
              isEditable
              isLoading={false}
            />
          ),
        )}
      </Grid>
    </>
  );
};
