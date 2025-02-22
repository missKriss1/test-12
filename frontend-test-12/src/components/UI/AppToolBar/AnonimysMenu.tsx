import { Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

const AnonimysMenu = () => {
  return (
    <div>
      <Button
        component={NavLink}
        to="/register"
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
      >
        Sign up
      </Button>
      <Button
        component={NavLink}
        to="/login"
        style={{
          color: "darkviolet",
          backgroundColor: "white",
          border: "1px solid violet",
          padding: "8px 16px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          marginLeft:'20px',
          transition: "background-color 0.3s ease",
        }}
      >
        Sign in
      </Button>
    </div>
  );
};

export default AnonimysMenu;
