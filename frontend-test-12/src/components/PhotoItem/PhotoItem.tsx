import { Photo } from '../../types';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../globalConstants.ts';
import ModelWindow from '../UI/ModelWindow/ModelWindow.tsx';
import React, { useState } from 'react';
import ButtonDeleteLoading from '../UI/ButtonDeleteLoading/ButtonDeleteLoading.tsx';

interface Props {
  photo: Photo;
  deletePhoto: (id: string) => void;
}

const PhotoItem: React.FC<Props> = ({ photo, deletePhoto }) => {
  const userSelect = useAppSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deletePhoto(id);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
    }
  };

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
          onClick={handleOpenModal}
        />
        <ModelWindow title={photo.title} image={photo.image} open={isModalOpen} onClose={handleCloseModal} />

        <Button
          onClick={handleOpenModal}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            marginTop: 1,
            padding: '10px',
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "darkviolet",
              textDecoration: "underline",
              textAlign: 'center',
              width: '100%',
            }}
          >
            {photo.title}
          </Typography>
        </Button>

        <Link
          to={`/photos/user/${photo.user._id}`}
          style={{ textDecoration: "none" }}
        >
          <CardContent sx={{ position: "relative", textAlign: "center"}}>
            <Typography gutterBottom variant="h6" component="div" sx={{ color: "darkviolet", textDecoration: "underline" }}>
              By: {photo.user.displayName}
            </Typography>
          </CardContent>
        </Link>

        {userSelect && (userSelect.role === "admin" || userSelect._id === photo.user._id) && (
          <ButtonDeleteLoading
            onClick={() => handleDelete(photo._id)}
            text="Delete"
            isLoading={isDeleting}
            isDisabled={isDeleting}
          />
        )}
      </Card>
    </div>
  );
};

export default PhotoItem;
