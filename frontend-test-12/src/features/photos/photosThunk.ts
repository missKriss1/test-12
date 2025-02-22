import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {  Photo, PhotoMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const addNewPhoto = createAsyncThunk<Photo, PhotoMutation, { state: RootState; rejectValue: ValidationError }> (
  'photos/addNewPhoto',
  async (newPhoto:PhotoMutation, { getState, rejectWithValue }) =>{
    const token = getState().users.user?.token;

    const data = new FormData();
    data.append('title', newPhoto.title);
    if (newPhoto.image === null) {
      return rejectWithValue({
        message:'Image is required',
        errors: {
          image:{
            message:'Image is required',
            name:'image'
          }
      },
      name: 'Image is required'});
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
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
)

export const fetchPhotos = createAsyncThunk<Photo[], void, { state: RootState; rejectValue: ValidationError }>(
  'photos/fetchPhotos',
  async (_, { getState }) =>{
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error("User not found");
    }
    const {data: photo} = await axiosApi.get<Photo[]>('/photos', {
      headers: { Authorization: token },
    });
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

export const fetchMyPhotos = createAsyncThunk<
  Photo[],
  string,
  { state: RootState; rejectValue: ValidationError }
>("photos/fetchMyPhotos", async (userId, { getState }) => {
  const token = getState().users.user?.token;

  if (!token) {
    throw new Error("User not found");
  }

  const cocktailsRes = await axiosApi.get<Photo[]>(
    `/photos?user=${userId}`,
    {
      headers: { Authorization: token },
    },
  );

  return cocktailsRes.data || [];
});

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