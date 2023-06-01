import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from './slices/recipes';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export default store;
