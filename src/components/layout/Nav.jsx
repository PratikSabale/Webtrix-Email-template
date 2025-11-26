import { Avatar, Box, IconButton } from "@mui/material";
import React from "react";
import webtrixLogo from "../../assets/webtrix-logo.png";
import { useNavigate } from "react-router-dom";
// import { PreviewRounded } from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{width: "100%", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, boxShadow: 1, backgroundColor: "#fff"}} >
      <Avatar
        src={webtrixLogo}
        variant="square"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      <IconButton onClick={() => navigate("/preview")} >
        <FaEye sx={{fontSize: 32}} />
      </IconButton>
    </Box>
  );
};

export default Nav;
