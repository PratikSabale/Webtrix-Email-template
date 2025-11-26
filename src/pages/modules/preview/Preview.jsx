import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DESKTOP_WIDTH = 1100, MOBILE_WIDTH = 375, MOBILE_HEIGHT = 700;

const Preview = () => {
  const navigate = useNavigate();

  const emailHTML = localStorage.getItem("emailTemplate") || `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
        body{margin:0;padding:0;background:#f4f6f8;font-family:Arial}
        .email-wrapper{max-width:600px;margin:0 auto;background:#fff}
        img{max-width:100%;height:auto;display:block}
      </style>
    </head>
    <body>
      <div class="email-wrapper" style="padding:0">
        <h2 style="padding:20px">Email Preview</h2>
        <p style="padding:0 20px 20px">No template data found.</p>
      </div>
    </body>
  </html>`;

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f4f6f8" }}>
      {/* TOP BAR */}
      <Box sx={{ height: 64, bgcolor: "#fff", display: "flex", alignItems: "center", px: 2, boxShadow: 1 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
        <Typography sx={{ ml: 2, fontWeight: 600 }}>Email Preview</Typography>
      </Box>

      {/* PREVIEW AREA */}
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)", gap: 0, p: 0, overflow: "hidden" }}>

        {/* DESKTOP */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "stretch" }}>
          <Box sx={{ width: DESKTOP_WIDTH, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, overflow: "auto", display: "flex", flexDirection: "column" }}>
            <Box sx={{ px: 2, py: 1, bgcolor: "#eee", fontSize: 14, fontWeight: 600 }}>Desktop preview</Box>
            <iframe title="Desktop Preview" srcDoc={emailHTML} style={{ width: "100%", height: "100%", overflow: "auto", border: "none", background: "#f4f6f8" }} />
          </Box>
        </Box>

        {/* MOBILE */}
        <Box sx={{ width: MOBILE_WIDTH + 30, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: MOBILE_WIDTH, height: MOBILE_HEIGHT, borderRadius: "36px", p: "12px", boxShadow: "0 15px 50px rgba(0,0,0,0.4)" }}>
            <Box sx={{ width: "100%", height: "100%", bgcolor: "#fff", borderRadius: "28px", overflow: "auto", display: "flex", flexDirection: "column", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
              <Box sx={{ px: 2, py: 1, bgcolor: "#f0f0f0", fontSize: 13, fontWeight: 600, textAlign: "center" }}>Mobile Preview</Box>
              <iframe title="Mobile Preview" srcDoc={emailHTML} style={{ width: "100%", height: "100%", overflow: "auto", border: "none", background: "#f4f6f8"}} />
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Preview