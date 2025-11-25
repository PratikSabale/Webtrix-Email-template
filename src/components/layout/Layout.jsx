import { Avatar, Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import webtrixLogo from "../../assets/webtrix-logo.png";
import DropAreas from "./DropArea";

const Layout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <Avatar src={webtrixLogo} />
      </Box>

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflowY: "auto",
            backgroundColor: "#f6f6f6",
          }}
        >
          {/* <Box sx={{ width: 600, p: 3 }}>central editable block</Box> */}
          <DropAreas />
        </Box>

        <Box
          sx={{
            width: 350,
            borderLeft: "1px solid #ddd",
            backgroundColor: "#fff",
            overflowY: "auto",
          }}
        >
          Settings panel contents
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
