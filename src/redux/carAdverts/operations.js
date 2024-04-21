import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = 'https://6625235b04457d4aaf9df8ff.mockapi.io';



export const fetchAll = createAsyncThunk(
  'carAdverts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/carAdverts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

