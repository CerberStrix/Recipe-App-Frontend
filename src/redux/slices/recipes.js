import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchRecipe = createAsyncThunk('recipe/fetchRecipe', async () => {
  const { data } = await axios.get('/recipe');
  return data;
});

export const fetchRemoveRecipe = createAsyncThunk(
  'recipe/fetchRemoveRecipe',
  async (id) => await axios.delete(`/recipe/${id}`),
);

const initialState = {
  recipes: {
    items: [],
    status: 'loading',
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipe.pending]: (state) => {
      state.recipes.items = [];
      state.recipes.status = 'loading';
    },
    [fetchRecipe.fulfilled]: (state, action) => {
      state.recipes.items = action.payload;
      state.recipes.status = 'loaded';
    },
    [fetchRecipe.rejected]: (state) => {
      state.recipes.items = [];
      state.recipes.status = 'error';
    },
    [fetchRemoveRecipe.pending]: (state, action) => {
      state.recipes.items = state.recipes.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const recipesReducer = recipesSlice.reducer;
