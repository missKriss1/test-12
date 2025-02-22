import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoading, selectPhoto } from '../../features/photos/photosSlice.ts';
import { useEffect } from 'react';
import { deletedPhoto, fetchPhotos } from '../../features/photos/photosThunk.ts';
import PhotoItem from '../../components/PhotoItem/PhotoItem.tsx';
import Grid from "@mui/material/Grid2";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const Home = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhoto)
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch]);

  const deletePhotoById = async (id: string) => {
    try {
      await dispatch(deletedPhoto(id));
      dispatch(fetchPhotos())
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner/>
      ):(
        <>
          {photos.length > 0 ? (
            <Box sx={{padding: 2}}>
              <Grid container spacing={2}>
                {photos.map((photo) => (
                  <Grid size={{xs: 6, md: 4}} key={photo._id}>
                    <PhotoItem photo={photo} deletePhoto={deletePhotoById} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography variant="h6" color="text.secondary">
              No photos found.
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
