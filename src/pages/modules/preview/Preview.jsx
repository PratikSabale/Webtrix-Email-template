import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();

  const emailHTML =
    localStorage.getItem("emailTemplate") ||
    `<div style="padding:20px;font-family:Arial">
        <h2>Email Preview</h2>
        <p>No template data found.</p>
     </div>`;

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f4f6f8" }}>
      
      {/* TOP BAR */}
      <Box sx={{height: 64, backgroundColor: "#fff", display: "flex", alignItems: "center", px: 2, boxShadow: 1}}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>

        <Typography sx={{ ml: 2, fontWeight: 600 }}>
          Email Preview
        </Typography>
      </Box>

      {/* PREVIEW AREA */}
      <Box sx={{display: "flex", height: "calc(100vh - 64px)", gap: 3, p: 3}}
      >
        {/* DESKTOP PREVIEW */}
        <Box sx={{flex: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, overflow: "hidden"}}>
          <Box sx={{px: 2, py: 1, backgroundColor: "#eeeeee", fontSize: 14, fontWeight: 600}}>
            Desktop Preview
          </Box>

          <iframe title="Desktop Preview" srcDoc={emailHTML} style={{width: "100%", height: "100%", border: "none"}}
          />
        </Box>

        {/* MOBILE PREVIEW */}
        <Box sx={{width: 375, backgroundColor: "#fff", borderRadius: 4, boxShadow: 3, overflow: "hidden"}} >
          <Box sx={{px: 2, py: 1, backgroundColor: "#eeeeee", fontSize: 14, fontWeight: 600, textAlign: "center"}} >
            Mobile Preview
          </Box>

          <iframe title="Mobile Preview" srcDoc={emailHTML} style={{width: 375, height: "100%", border: "none"}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;