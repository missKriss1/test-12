import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () =>{
    const {data: photo} = await axiosApi.get('photos');
    return photo || [];
  }
)