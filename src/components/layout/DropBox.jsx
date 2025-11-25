import { Box, Typography, TextField, Button as MuiButton,  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,} from "@mui/material";
import {
    DownloadSimple,
    Image as ImageIcon,
    TextT,
    RadioButton,
    
} from "phosphor-react";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import React, { useState } from "react";

const DropBox = () => {
    const [mode, setMode] = useState("empty"); // empty | image | text | button
    const [hover, setHover] = useState(false);

      const clearBox = () => setMode("empty");

        const actions = [
    {
    //   icon: <DeleteIcon color="error" />,
      name: "Clear Container",
      action: clearBox,
    },
  ];
    
    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                height: mode === "empty" ? 120 : "auto",
                transition: "all 0.3s ease",
                border: hover
                    ? "2px solid #6d8ac7"
                    : mode === "empty"
                        ? "2px dashed #9db3d8"
                        : "",
                backgroundColor: mode === "empty" ? "#eaf2fe" : "#ffffff",
                borderRadius: 1,
                position: "relative",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6d8ac7",
            }}

            
        >

            
            
 {/* SPEED DIAL — only when mode is NOT empty */}
      {mode !== "empty" && (
        <SpeedDial
          ariaLabel="DropBox Actions"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            "& .MuiSpeedDial-fab": {
              width: 40,
              height: 40,
              backgroundColor: "#fff",
            },
          }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.action}
            />
          ))}
        </SpeedDial>
      )}





            {/* ---------------- Hover Toolbar with Animation ---------------- */}
            {mode === "empty" && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        left: "50%",
                        transform: hover
                            ? "translate(-50%, 0)"
                            : "translate(-50%, 10px)",
                        opacity: hover ? 1 : 0,
                        transition: "all 0.3s ease",
                        display: "flex",
                        gap: 2,
                        backgroundColor: "#fff",
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        pointerEvents: hover ? "auto" : "none",
                    }}
                >
                    <Box sx={{ cursor: "pointer" }} onClick={() => setMode("image")}>
                        <ImageIcon size={22} color="#6d8ac7" />
                    </Box>
                    <Box sx={{ cursor: "pointer" }} onClick={() =>  setMode("text")}>
                        <TextT size={22} color="#6d8ac7" />
                    </Box>
                    <Box sx={{ cursor: "pointer" }} onClick={() => setMode("button")}>
                        <RadioButton size={22} color="#6d8ac7" />
                    </Box>
                </Box>
            )}

            {/* ---------------- Default Empty Mode ---------------- */}
            {mode === "empty" && (
                <Box
                    sx={{
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        transform: hover ? "translateY(-10px)" : "translateY(0px)",
                    }}
                >
                    <DownloadSimple size={24} weight="duotone" />
                    <Typography mt={1} fontSize={14}>
                        Drop content here
                    </Typography>
                </Box>
            )}

            {/* ---------------- Image Mode ---------------- */}
            {mode === "image" && (
                <Box sx={{ textAlign: "center", height: "auto" }}>
                    <Typography fontSize={14} mb={1}>
                        Upload Image
                    </Typography>
                    <MuiButton component="label" variant="outlined">
                        Choose File
                        <input hidden accept="image/*" type="file" />
                    </MuiButton>
                </Box>
            )}

            {/* ---------------- Text Mode ---------------- */}
            {mode === "text" && (

                <TextField type="text" multiline
                    rows={4} inputProps={{ maxLength: 255 }} fullWidth placeholder="Enter your text..." size="small" />
            )}

            {/* ---------------- Button Mode ---------------- */}
            {mode === "button" && (
                <MuiButton variant="contained">Button</MuiButton>
            )}
        </Box>
    );
};

export default DropBox;
