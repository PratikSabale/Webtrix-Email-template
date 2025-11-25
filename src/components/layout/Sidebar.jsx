import {
  Box,
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import {
  ArrowsInLineVertical,
  Code,
  FlagBanner,
  Gradient,
  Image,
  Layout,
  RadioButton,
  SelectionAll,
  ShareNetwork,
  TextOutdent,
  TextT,
  User,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useState } from "react";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    padding: 15,
    fontSize: 12,
  },
});

const Sidebar = () => {
  const [open, setOpen] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(0);
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

  const layoutMenu = [
    { title: "General Modules", icon: <Layout size={25} /> },
    { title: "Layouts", icon: <Gradient size={25} /> },
    { title: "My modules", icon: <User size={25} /> },
    { title: "Template Modules", icon: <SelectionAll size={25} /> },
  ];
  return (
    <>
      <Box
        sx={{
          width: 70,
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
            <CustomWidthTooltip
              key={index}
              title={item.title}
              placement="right"
              arrow
            >
              <Box
                sx={{
                  padding: 1,
                  cursor: "pointer",
                  borderRadius: 2,
                  border: "2px solid #D3D3D3",

                  "&:hover": {
                    border: "2px solid #90EE90",
                  },
                }}
                onClick={() => setOpen((prev) => !prev)}
              >
                {item.icon}
              </Box>
            </CustomWidthTooltip>
          );
        })}
      </Box>
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: 100,
            left: 10,
            zIndex: 1000,
            maxWidth: 500,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <IconButton size="large" onClick={() => setOpen((prev) => !prev)}>
              <X size={20} color="black" />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "#D3D3D3",
                borderRadius: 3,
                p: 0.5,
                gap: 1,
              }}
            >
              
              {layoutMenu.map((item, index) => {
                const bgColor =
                  selectedLayout === index ? "#ffffff" : "#D3D3D3";
                return (
                  <CustomWidthTooltip
                    key={index}
                    title={item.title}
                    placement="top"
                    arrow
                  >
                    <Box
                      sx={{
                        px: 3,
                        py: 0.5,
                        background: bgColor,
                        borderRadius: 3,
                      }}
                      onClick={() => {
                        setSelectedLayout(index);
                      }}
                    >
                      {item.icon}
                    </Box>
                  </CustomWidthTooltip>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <input
              style={{
                borderRadius: 10,
                padding: 10,
                background: "#D3D3D3",
                width: 250,
                outline: "none",
                border: "none",
              }}
              placeholder="Search by name,#tag, or moduleID"
              onFocus={(e) => (e.target.style.outlineColor = "grren")}
              onBlur={(e) => (e.target.style.outline = "none")}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
