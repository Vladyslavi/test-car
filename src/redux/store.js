import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { carAdvertsReducer } from './carAdverts/slice';
import { favoriteReducer } from './favorites/slice';

const rootReducer = combineReducers({
  carAdverts: carAdvertsReducer,
  favorites: favoriteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
