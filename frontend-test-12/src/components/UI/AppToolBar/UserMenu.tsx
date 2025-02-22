import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { User } from "../../../types";
import { apiUrl } from '../../../../globalConstants.ts';
import { logout } from '../../../features/user/userThunk.ts';
import { unsetUser } from '../../../features/user/userSlice.ts';
import zaglushkaAvatar from "/src/assets/zaglushkaAvatar.jpg"

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const avatarImage = user.avatar
    ? `${apiUrl}/${user.avatar}`
    : zaglushkaAvatar;
  const dispatch = useAppDispatch();

  const HandleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hendelClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={<Avatar src={avatarImage} alt={user?.displayName} />}
      >
        Hello, {user?.displayName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={hendelClose}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/add_new_photo"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add new photo
            </NavLink>
          </MenuItem>
        </div>
      </Menu>

      <button
        type="button"
        onClick={HandleLogout}
        style={{
          color: "darkviolet",
          backgroundColor: "white",
          border: "1px solid violet",
          padding: "8px 16px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
