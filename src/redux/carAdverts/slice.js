import { createSlice } from '@reduxjs/toolkit';
import { fetchall } from './operations';


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
      .addCase(fetchall.pending)
      .addCase(fetchall.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchall.rejected);
  },
});

export const carAdvertsReducer = carAdvertsSlice.reducer;