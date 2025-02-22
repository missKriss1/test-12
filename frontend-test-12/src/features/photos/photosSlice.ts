import { Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPhotos } from './photosThunk.ts';
import { RootState } from '../../app/store.ts';

interface photosState{
  photos: Photo[];
  fetchingLoading: boolean;
  creatingLoading: boolean;
  fetchError: boolean;
}

const initialState: photosState = {
  photos: [],
  fetchingLoading: false,
  creatingLoading: false,
  fetchError: false,
}

export const selectPhoto = (state: RootState) => state.photos.photos

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
      });
  }
})

export const photosReducer = photosSlice.reducer;