import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectLoading,
  selectPhotoByUser,
} from "../../features/photos/photosSlice.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  deletedPhoto,
  fetchPhotoslById,
} from "../../features/photos/photosThunk.ts";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PhotoItem from "../../components/PhotoItem/PhotoItem.tsx";
import Typography from "@mui/material/Typography";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const PhotoByUser = () => {
  const dispatch = useAppDispatch();
  const photoUser = useAppSelector(selectPhotoByUser);
  const { id } = useParams() as { id: string };
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPhotoslById(id));
  }, [dispatch, id]);

  const deletePhotoById = async (idPhoto: string) => {
    try {
      await dispatch(deletedPhoto(idPhoto));
      await dispatch(fetchPhotoslById(id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {photoUser.length > 0 ? (
            <Box sx={{ padding: 2 }}>
              <span style={{ fontSize: "1.0rem", marginLeft: "15px" }}>
                Name user :
                <b
                  style={{
                    fontSize: "2.0rem",
                    fontWeight: "bold",
                    color: "darkviolet",
                    marginLeft: "10px",
                  }}
                >
                  {photoUser[0].user.displayName}
                </b>
              </span>
              <Grid container spacing={2}>
                {photoUser.map((photo) => (
                  <Grid size={{ xs: 6, md: 4 }} key={photo._id}>
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

export default PhotoByUser;
