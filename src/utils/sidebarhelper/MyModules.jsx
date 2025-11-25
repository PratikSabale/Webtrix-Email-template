import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Rows, SquaresFour } from "phosphor-react";
const MyModules = () => {
  const [openLayout, setOpenLayout] = useState(false);
  const [selectedLayoutType, setSelectedLayoutType] = useState("Grid");

  const layoutType = [
    { title: "Grid", icon: <SquaresFour size={25} /> },
    { title: "List", icon: <Rows size={25} /> },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <input
            style={{
              borderRadius: 10,
              padding: 10,
              background: "#D3D3D3",
              width: 220,
              outline: "none",
              border: "none",
            }}
            placeholder="Search by name,#tag, or moduleID"
            onFocus={(e) => (e.target.style.outlineColor = "grren")}
            onBlur={(e) => (e.target.style.outline = "none")}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #D3D3D3",
              padding: 0.5,
              borderRadius: 3,
              cursor: "pointer",
              ":hover": { border: "2px solid #90EE90" },
            }}
          >
            <TuneIcon />
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            border: "2px solid #D3D3D3",
            gap: 1,
            padding: 0.5,
            borderRadius: 3,
            cursor: "pointer",
            ":hover": { border: "2px solid #90EE90" },
          }}
          onClick={() => setOpenLayout((prev) => !prev)}
        >
          {selectedLayoutType === "Grid" ? (
            <SquaresFour size={25} />
          ) : (
            <Rows size={25} />
          )}
          <ExpandMoreIcon />
          {openLayout && (
            <Box
              sx={{
                position: "absolute",
                top: 40,
                left: 10,
                zIndex: 1000,
                background: "#ffffff",
                border: "1px solid #D3D3D3 ",
                borderRadius: 3,
                p: 1,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              {layoutType.map((item, index) => {
                const bgColor =
                  selectedLayoutType === item.title ? "#D3D3D3" : "white";
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "center",
                      py: 1,
                      px: 2,
                      background: bgColor,
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedLayoutType(item.title);
                      e.stopPropagation();
                      setOpenLayout(false);
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyModules;
