import React from "react";
import { Box } from "@mui/material";

const BoxComponent = ({ gridCount }) => {
  const item = {
    type: "grid",
    gridCount: gridCount, // this is what we send!
  };

  return (
    <Box
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("application/json", JSON.stringify(item))
      }
      sx={{
        padding: 2,
        backgroundColor: "#e5e7eb",
        borderRadius: 2,
        cursor: "grab",
        mb: 2,
        textAlign: "center",
        "&:active": { cursor: "grabbing" },
      }}
    >
      Grid {gridCount} Columns
    </Box>
  );
};

export default BoxComponent;
