import React from "react";
import { Box } from "@mui/material";

const BoxComponent = ({ gridCount, isDropped }) => {
  return (
    <Box
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ gridCount })
        )
      }
      sx={{
        padding: 2,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        cursor: "grab",
        mb: 2,
        border: "1px solid #e5e7eb",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
          gap: 1.5,
        }}
      >
        {Array.from({ length: gridCount }).map((_, idx) => (
          <Box
            key={idx}
            sx={{
              height: isDropped ? 100 : 50,
              backgroundColor: "#e6f2ff",
              border: "2px dashed #8ab6e6",
              borderRadius: 2,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BoxComponent;
