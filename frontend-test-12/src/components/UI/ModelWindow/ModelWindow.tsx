import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiUrl } from '../../../../globalConstants.ts';

interface ModelWindowProps {
  title: string;
  image: string;
  open: boolean;
  onClose: () => void;
}

const ModelWindow: React.FC<ModelWindowProps> = ({ title, image, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ padding: 0 }}>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: 0,
        }}
      >
        <img
          src={image ? apiUrl + '/' + image : image}
          alt={title}
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'contain',
          }}
        />
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            padding: '10px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ModelWindow;
