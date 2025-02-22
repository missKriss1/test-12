import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { PhotoModal } from '../../types';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () =>{
    const {data: photo} = await axiosApi.get('photos');
    return photo || [];
  }
)

export const fetchPhotoslById = createAsyncThunk<PhotoModal, string>(
  "photos/fetchPhotoslById",
  async (photolId) => {
    const response = await axiosApi.get<PhotoModal>(
      `/photos/${photolId}`,
    );
    return response.data;
  },
);