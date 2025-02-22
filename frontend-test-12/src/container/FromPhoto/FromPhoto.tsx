import { useEffect, useState } from 'react';
import { PhotoMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { addNewPhoto } from '../../features/photos/photosThunk.ts';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import FileInput from '../../components/FileInput.tsx';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';
import { selectCreatLoading, selectErrorCreat } from '../../features/photos/photosSlice.ts';

const initialState ={
  title: '',
  image:  null
}
const FromPhoto = () => {
  const [form, setForm] = useState<PhotoMutation>({...initialState});
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const navigate = useNavigate();
  const selectError = useAppSelector(selectErrorCreat);
  const selectLoading = useAppSelector(selectCreatLoading)

  useEffect(() => {
    if(!user) navigate('/register')
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addNewPhoto(form)).unwrap();
      setForm({ ...initialState });
      navigate(`/`);
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prevState: PhotoMutation) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: PhotoMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFieldError = () => {
    try {
      return selectError?.error;
    } catch {
      return undefined;
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-center mt-4 ">Add new cocktail</h2>
        <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px"}}>
          <Box
            component="form"
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            onSubmit={onFormSubmit}
          >
            <h5 className="fs-5">Title:</h5>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={form.title}
              onChange={onInputChange}
              sx={{
                input: {
                  backgroundColor: "#f0f0f0",
                },
              }}
              error={!!getFieldError()}
              helperText={getFieldError()}
            />

            <div className="mb-3">
              <label htmlFor="date">Photo:</label>
              <FileInput
                id="image"
                name="image"
                label="Photo"
                onGetFile={onFileChange}
                file={form.image}
              />
            </div>

            <ButtonLoading
              isLoading={selectLoading}
              isDisabled={selectLoading}
              text="Add new photo"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default FromPhoto;