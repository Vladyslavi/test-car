import { createSlice } from '@reduxjs/toolkit';
import { fetchAll } from './operations';


const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const carAdvertsSlice = createSlice({
  name: 'carAdverts',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending)
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAll.rejected);
  },
});

export const carAdvertsReducer = carAdvertsSlice.reducer;