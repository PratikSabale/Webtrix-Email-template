import { Box, Typography } from "@mui/material";
import React from "react";
import { droppedItemsState } from "../../state/dnd/dndState";
import { useRecoilState } from "recoil";
import BoxComponent from "../../components/uiComponents/BoxComponent ";

const PlayArea = () => {
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
        maxWidth: "60%",
        maxHeight: "80%",
        minWidth:"60%",
        minHeight:"80%",
        background: "#fff",
        p: 2.5,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
        left: 60,
        overflow:"hidden"
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Dropped Items
      </Typography>

      {items.slice(0,4).map((item) => (
        <BoxComponent
          key={item.instanceId}
          gridCount={item.gridCount}
          isDropped={true}
        />
      ))}
    </Box>
  );
};

export default PlayArea;
