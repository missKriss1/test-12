import { useState } from "react";
import { Alert, Avatar, Box, Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectLoginError } from "./userSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, login } from "./userThunk.ts";
import { GoogleLogin } from "@react-oauth/google";
import { RegisterMutation } from "../../types";

const LoginUser = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterMutation>({
    email: "",
    password: "",
    avatar: null,
    displayName: "",
  });

  const inpytChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate("/");
  };

  const googleLoginUser = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#6A0DAD",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <LockOpenIcon sx={{ color: "#6A0DAD" }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Sign in
          </Typography>

          {loginError && (
            <Alert
              severity="error"
              sx={{
                mt: 3,
                width: "100%",
                color: "black",
                backgroundColor: "white",
              }}
            >
              {loginError.error}
            </Alert>
          )}

          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginUser(credentialResponse.credential);
                }
              }}
              onError={() => alert("Login failed")}
            />
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid direction={"column"} spacing={2}>
              <Grid>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={inpytChangeHandler}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={inpytChangeHandler}
                  style={{
                    marginTop:'10px',
                    backgroundColor: "white",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "white",
                color: "darkviolet",
                "&:hover": {
                  backgroundColor: "whitesmoke",
                },
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <NavLink to="/register" style={{ color: "white" }}>
                  No account yet? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginUser;
