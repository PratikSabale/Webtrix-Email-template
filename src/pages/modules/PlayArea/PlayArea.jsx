import { Box, Typography, IconButton, Modal, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { droppedItemsState } from "../../../state/dnd/dndState";
import { useRecoilState } from "recoil";
import BoxComponent from "../../../components/uiComponents/BoxComponent ";

const PlayArea = () => {
  const [items, setItems] = useRecoilState(droppedItemsState);

  const [open, setOpen] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));

    const newItem = {
      ...data,
      instanceId: Date.now(),
    };

    setItems((prev) => [...prev, newItem]);
  };

  const addLayout = (gridCount) => {
    const newBox = {
      type: "container",
      gridCount,
      instanceId: Date.now(),
    };

    setItems((prev) => [...prev, newBox]);
    setOpen(false); // close modal
  };

  return (
    <>
      {/* -------------------- PLAY AREA WRAPPER -------------------- */}
      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        sx={{
          width: { xs: "100%", sm: "100%", md: "60%" },
          minHeight: "80%",
          background: "#fff",
          p: 2.5,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          position: "relative",
          left: { xs: 0, sm: 0, md: 60 },
        }}
      >
        {/* -------------------- EXISTING DROPPED ITEMS -------------------- */}

        {items.map((item) => (
          <BoxComponent
            key={item.instanceId}
            gridCount={item.gridCount}
            isDropped={true}
          />
        ))}
        {/* -------------------- ADD CONTAINER BUTTON -------------------- */}
        <Box
          sx={{
            width: "100%",
            height: "100px",
            background: "#ffffff",
            borderRadius: 2,
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            cursor: "pointer",
            gap: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => setOpen(true)}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#1976d2" }}>
            Add Container
          </Typography>

          <IconButton
            sx={{
              background: "#e3f2fd",
              "&:hover": { background: "#bbdefb" },
            }}
          >
            <AddIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </Box>
      </Box>

      {/* -------------------- MUI MODAL FOR LAYOUT OPTIONS -------------------- */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "#fff",
            p: 3,
            borderRadius: 2,
            mx: "auto",
            mt: "10%",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Select Layout
          </Typography>

          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((count) => (
              <Grid item xs={6} key={count}>
                <Paper
                  elevation={3}
                  onClick={() => addLayout(count)}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: 2,
                    transition: "0.2s",
                    "&:hover": {
                      background: "#eaf2fe",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Typography fontWeight={600}>{count} Column</Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${count}, 1fr)`,
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    {Array.from({ length: count }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          height: 40,
                          border: "1px dashed #9db3d8",
                          borderRadius: 1,
                          background: "#f4f7ff",
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default PlayArea;
