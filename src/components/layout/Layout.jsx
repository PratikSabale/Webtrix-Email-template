import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import PlayArea from "../../pages/modules/PlayArea/PlayArea";
import SettingsPanel from "../../pages/modules/Settings panel/SettingsPanel";
import Nav from "./Nav";

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
        <Nav />
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
          <PlayArea />
        </Box>

        <Box
          sx={{
            width: 350,
            overflowY: "auto",
          }}
        >
          <SettingsPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
