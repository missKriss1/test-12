import { Photo, PhotoModal } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPhotos, fetchPhotoslById } from './photosThunk.ts';
import { RootState } from '../../app/store.ts';

interface photosState{
  photos: Photo[];
  photoDet: PhotoModal | null;
  fetchingLoading: boolean;
  creatingLoading: boolean;
  fetchError: boolean;
}

const initialState: photosState = {
  photos: [],
  photoDet: null,
  fetchingLoading: false,
  creatingLoading: false,
  fetchError: false,
}

export const selectPhoto = (state: RootState) => state.photos.photos
export const selectPhotoDet = (state: RootState) => state.photos.photoDet

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
        state.photoDet = photos;
      })
      .addCase(fetchPhotoslById.rejected, (state) => {
        state.fetchError = true;
      })
  }
})

export const photosReducer = photosSlice.reducer;