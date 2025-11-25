import { Box, Tooltip } from "@mui/material";
import {
  ArrowsInLineVertical,
  Code,
  FlagBanner,
  Image,
  Layout,
  RadioButton,
  ShareNetwork,
  TextOutdent,
  TextT,
  VideoCamera,
} from "phosphor-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const sidebarMenu = [
    { title: "Layout", icon: <Layout size={25} /> },
    { title: "Image", icon: <Image size={25} /> },
    { title: "Text", icon: <TextT size={25} /> },
    { title: "Button", icon: <RadioButton size={25} /> },
    { title: "Gap", icon: <ArrowsInLineVertical size={25} /> },
    { title: "Social Network", icon: <ShareNetwork size={25} /> },
    { title: "Menu", icon: <TextOutdent size={25} /> },
    { title: "HTML", icon: <Code size={25} /> },
    { title: "Banner", icon: <FlagBanner size={25} /> },
    { title: "Video", icon: <VideoCamera size={25} /> },
  ];

  return (
    <>
      <Box
        sx={{
          width: 70,
          height: "auto",
          borderRight: "1px solid #ddd",
          backgroundColor: "#fafafa",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
          gap: 3,
          position: "relative",
        }}
      >
        {sidebarMenu.map((item, index) => {
          return (
            <Tooltip key={index} title={item.title} placement="right">
              <Box
                sx={{
                  padding: 1,
                  cursor: "pointer",
                  borderRadius: 2,
                  border: "2px solid gray",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                onClick={() => setOpen((prev) => !prev)}
              >
                {item.icon}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: 70,
            left: 70,
            zIndex: 10000,
            maxWidth: 420,
            p: 3,
            borderRadius: 3,
            backgroundColor: "#F3E2D1",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ fontWeight: 600, fontSize: 18 }}>Content goes here</Box>
          <Box sx={{ mt: 1, opacity: 0.7 }}>
            Your popup box renders properly now.
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
