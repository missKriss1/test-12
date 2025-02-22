import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPhoto } from '../../features/photos/photosSlice.ts';
import { useEffect } from 'react';
import { deletedPhoto, fetchPhotos } from '../../features/photos/photosThunk.ts';
import PhotoItem from '../../components/PhotoItem/PhotoItem.tsx';
import Grid from "@mui/material/Grid2";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhoto)
  const {id} = useParams() as {id: string};

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
      {photos.length > 0 ? (
        <Box sx={{padding: 2}}>
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid size={{xs: 6, md: 4}} key={photo._id}>
                <PhotoItem photo={photo} deletePhoto={deletePhotoById} idUser={id}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No photos found.
        </Typography>
      )}
    </div>
  );
};

export default Home;
