import { Box, Typography } from "@mui/material";
import { DownloadSimple } from "phosphor-react";
import React from "react";

const DropBox = ({ height }) => (
  <Box
    sx={{
      //   flex: 1,
      height: height,
      border: "2px dashed #9db3d8",
      backgroundColor: "#eaf2fe",
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6d8ac7",
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <DownloadSimple size={24} weight="duotone" />
      <Typography mt={1} fontSize={14}>
        Drop content here
      </Typography>
    </Box>
  </Box>
);

const DropAreas = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "#fff", // white background
        p: 3, // padding on all sides (theme spacing → 24px)           // optional: round edges
        width: 700,
      }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ width: 231 }}>
          <DropBox height={120} />
        </Box>

        <Box sx={{ width: 440 }}>
          <DropBox height={120} />
        </Box>
      </Box>

      <DropBox height={150} />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: 355 }}>
            <DropBox height={140} />
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: 321 }}>
            <DropBox height={140} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DropAreas;
