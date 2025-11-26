import { Box } from "@mui/material";
import React from "react";
import BoxComponent from "../../components/uiComponents/BoxComponent";

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
      {/* <BoxComponent colCount={1} />
      <BoxComponent colCount={2} />
      <BoxComponent colCount={3} />
      <BoxComponent colCount={4} />
      <BoxComponent colCount={5} />
      <BoxComponent colCount={6} />
      <BoxComponent colCount={7} />
      <BoxComponent colCount={8} />
      <BoxComponent colCount={9} />
      <BoxComponent colCount={10} /> */}
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/json", JSON.stringify(item))
          }
          style={{ padding: 10, background: "#ddd", margin: 10 }}
        >
          {item.label}
        </div>
      ))}
    </Box>
  );
};

export default Layouts;
