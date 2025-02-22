import { Container, CssBaseline } from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar.tsx";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./features/user/LoginUser.tsx";
import RegisterUser from "./features/user/RegisterUser.tsx";
import Home from "./container/Home/Home.tsx";
import PhotoByUser from "./container/PhotoByUser/PhotoByUser.tsx";
import FromPhoto from "./container/FromPhoto/FromPhoto.tsx";
import MyPhotos from "./container/MyPhotos/MyPhotos.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolBar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Routes>
            <Route path="*" element={<h1>Not found</h1>} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/photos/user/:id" element={<PhotoByUser />} />
            <Route path="/add_new_photo" element={<FromPhoto />} />
            <Route path="/photos" element={<MyPhotos />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
