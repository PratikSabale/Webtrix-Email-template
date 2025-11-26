import { Box, Typography } from "@mui/material";
import React from "react";
import { droppedItemsState } from "../../state/dnd/dndState";
import { useRecoilState } from "recoil";
import BoxComponent from "../uiComponents/BoxComponent "; // ✅ FIX IMPORT

const DropAreas = () => {
  const [items, setItems] = useRecoilState(droppedItemsState);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));

    const newItem = {
      ...data,
      instanceId: Date.now(),
    };

    setItems((prev) => [...prev, newItem]);
  };

  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      sx={{
        width: "60%",
        height: "70%",
        background: "#fff",
        p: 2.5,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
        left: 60,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Dropped Items
      </Typography>

      {items.map((item) => (
        <BoxComponent
          key={item.instanceId}
          gridCount={item.gridCount}
          isDropped={true}
        />
      ))}
    </Box>
  );
};

export default DropAreas;
