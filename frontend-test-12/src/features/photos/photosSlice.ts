import { GlobalError, Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPhotos, fetchPhotoslById } from './photosThunk.ts';
import { RootState } from '../../app/store.ts';

interface photosState{
  photos: Photo[];
  photoByUser: Photo[];
  fetchingLoading: boolean;
  creatingLoading: boolean;
  fetchError: boolean;
  creatingError: GlobalError | null;
}

const initialState: photosState = {
  photos: [],
  photoByUser: [],
  fetchingLoading: false,
  creatingLoading: false,
  fetchError: false,
  creatingError: null,
}

export const selectPhoto = (state: RootState) => state.photos.photos
export const selectPhotoByUser = (state: RootState) => state.photos.photoByUser;
export const selectCreatLoading = (state: RootState) => state.photos.creatingLoading
export const selectErrorCreat = (state: RootState) => state.photos.creatingError

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.fetchingLoading = true;
        state.fetchError = false;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.fetchingLoading = false;
        state.photos = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.fetchingLoading = false;
        state.fetchError = true;
      })
      .addCase(fetchPhotoslById.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchPhotoslById.fulfilled, (state, { payload: photos }) => {
        state.fetchingLoading = false;
        state.photoByUser = photos;
      })
      .addCase(fetchPhotoslById.rejected, (state) => {
        state.fetchError = true;
      })
  }
})

export const photosReducer = photosSlice.reducer;