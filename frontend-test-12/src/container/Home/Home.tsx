import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPhoto } from '../../features/photos/photosSlice.ts';
import { useEffect } from 'react';
import { fetchPhotos } from '../../features/photos/photosThunk.ts';
import PhotoItem from '../../components/PhotoItem/PhotoItem.tsx';
import Grid from "@mui/material/Grid2";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Home = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhoto)

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch]);

  return (
    <div>
      {photos.length > 0 ? (
        <Box sx={{padding: 2}}>
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid size={{xs: 6, md: 4}} key={photo._id}>
                <PhotoItem photo={photo} deletePhoto={() => {
                }}/>
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
