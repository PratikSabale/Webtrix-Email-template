import React from "react";
import { Paper, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { draggedItemState } from "../../recoil/layoutAtoms";

const items = [
  { label: "Container", type: "Container" },
  { label: "Title", type: "Title" },
  { label: "Image", type: "Image" },
  { label: "Paragraph", type: "Paragraph" },
  { label: "Video", type: "Video" },
  { label: "Space", type: "Space" },
];

export default function SidebarPage() {
  const setDraggedItem = useSetRecoilState(draggedItemState);

  const handleDragStart = (type) => {
    setDraggedItem({ type });
  };

  return (
    <Paper sx={{ p: 3, width: "260px", m: 3 }}>
      <Typography variant="h6">Sidebar</Typography>

      {items.map((item) => (
        <Paper
          key={item.type}
          sx={{
            p: 2,
            mt: 2,
            textAlign: "center",
            cursor: "grab",
            userSelect: "none",
          }}
          draggable
          onDragStart={() => handleDragStart(item.type)}
        >
          {item.label}
        </Paper>
      ))}
    </Paper>
  );
}
