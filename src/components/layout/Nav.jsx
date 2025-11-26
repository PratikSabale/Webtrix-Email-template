import { Avatar, Box } from "@mui/material";
import React from "react";
import webtrixLogo from "../../assets/webtrix-logo.png";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Avatar src={webtrixLogo} />

      {/* <Preview />  */}
    </Box>
  );
};

export default Nav;
