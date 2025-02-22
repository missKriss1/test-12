import { Photo } from '../../types';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../globalConstants.ts';

interface Props {
  photo: Photo;
  deletePhoto: (id: string) => void;
}

const PhotoItem: React.FC<Props> = ({ photo, deletePhoto }) => {
  const userSelect = useAppSelector(selectUser);
  let imagePhoto;

  if (photo.image) {
    imagePhoto = `${apiUrl}/${photo.image}`;
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: 250,
          boxShadow: 3,
          position: "relative",
          marginBottom: 2,
          border: '2px solid violet',
          backgroundColor: 'white',
          margin: '14px',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '91%',
            height: 200,
            objectFit: "cover",
            margin: '10px',
            display: 'block',
            objectPosition: 'center',
          }}
          image={imagePhoto}
          alt={photo.title}
        />

        <Link
          to={`/cocktails/${photo._id}`}
          style={{ textDecoration: "none", marginTop: 1, }}
        >
          <CardContent sx={{ position: "relative", textAlign: "center", marginBottom: '10px' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ color: "darkviolet", textDecoration: "underline", }}>
              {photo.title}
            </Typography>
          </CardContent>
        </Link>

        <Link
          to={`/photos/user/${photo.user._id}`}
          style={{ textDecoration: "none" }}
        >
          <CardContent sx={{ position: "relative", textAlign: "center",  marginBottom:'20px'}}>
            <Typography gutterBottom variant="h6" component="div" sx={{ color: "darkviolet", textDecoration: "underline" }}>
              By: {photo.user.displayName}
            </Typography>
          </CardContent>
        </Link>

        {userSelect && (userSelect.role === "admin" || userSelect._id === photo.user._id) && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deletePhoto(photo._id);
            }}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "white",
              color: "darkviolet",
              border: '1px solid darkviolet',
              "&:hover": {
                backgroundColor: "whitesmoke",
              },
            }}
          >
            Delete
          </Button>
        )}
      </Card>
    </div>
  );
};

export default PhotoItem;
