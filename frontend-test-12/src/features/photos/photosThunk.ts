import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { GlobalError, Photo, PhotoMutation } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const addNewPhoto = createAsyncThunk<Photo, PhotoMutation, { state: RootState; rejectValue: GlobalError }> (
  'photos/addNewPhoto',
  async (newPhoto:PhotoMutation, { getState, rejectWithValue }) =>{
    const token = getState().users.user?.token;

    const data = new FormData();
    data.append('title', newPhoto.title);
    if (newPhoto.image === null) {
      return rejectWithValue({error: 'Image is required'});
    } else {
      data.append('image', newPhoto.image);
    }
    try{
       const response =await axiosApi.post<Photo>('/photos', data, {
        headers: { Authorization: token },
      })
      return response.data;
    }catch(error){
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
)

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () =>{
    const {data: photo} = await axiosApi.get('photos');
    return photo || [];
  }
)

export const fetchPhotoslById = createAsyncThunk(
  "photos/fetchPhotoslById",
  async (id: string) => {
    const response = await axiosApi.get(
      `/photos/users/${id}`,
    );
    return response.data;
  },
);

export const deletedPhoto = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("photos/deletedPhoto", async (id: string, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(`/photos/${id}`, {
    headers: { Authorization: token },
  });
});