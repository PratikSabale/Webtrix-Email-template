import { Box } from "@mui/material";
import React from "react";

const BoxComponent = ({ colCount = 1, height = "100px", bg = "#eaf2fe" }) => {
  const cells = Array.from({ length: colCount });

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: "100%",
        height,
        background: bg,
        display: "grid",
        gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        border: "2px dashed #9db3d8",
        borderRadius: 3,
        boxSizing: "border-box",
      }}
    >
      {cells.map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            borderRight: index !== colCount - 1 ? "2px dashed #9db3d8" : "none",
            boxSizing: "border-box",
          }}
        />
      ))}
    </Box>
  );
};

export default BoxComponent;
