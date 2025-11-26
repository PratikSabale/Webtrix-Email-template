import { Box } from "@mui/material";
import React from "react";
import BoxComponent from "../../components/uiComponents/BoxComponent ";

const Layouts = () => {
  const items = [
    { id: 1, label: "Header", type: "header" },
    { id: 2, label: "Image", type: "image" },
    { id: 3, label: "Text", type: "text" },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
        scrollbarWidth: "thin",
        boxSizing: "border-box",
      }}
    >
      <BoxComponent gridCount={1} isDropped={false} />
      <BoxComponent gridCount={2} isDropped={false} />
      <BoxComponent gridCount={3} isDropped={false} />
      <BoxComponent gridCount={4} isDropped={false} />
    </Box>
  );
};

export default Layouts;
