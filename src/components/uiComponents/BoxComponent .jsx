import React, { useState } from "react";
import {
  Box,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from "@mui/material";
import {
  Image as ImageIcon,
  TextT,
  RadioButton,
  Share,
  Minus,
  List,
} from "phosphor-react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

const actions = [
  { icon: <Minus size={32} />, name: "1 column", count: 1 },
  { icon: <DragHandleIcon />, name: "2 column", count: 2 },
  { icon: <List size={32} />, name: "3 column", count: 3 },
  { icon: <DensitySmallIcon />, name: "4 column", count: 4 },
];

const BoxComponent = ({ gridCount, isDropped }) => {
  const [childGrid, setChildGrid] = useState(null);
  console.log("data", childGrid);

  const [modes, setModes] = useState(
    Array.from({ length: gridCount }, () => ({
      type: "empty",
      file: null,
      value: "",
    }))
  );

  const updateMode = (idx, value) => {
    setModes((prev) => {
      const copy = [...prev];
      copy[idx] = { type: value, file: null, value: "" };
      return copy;
    });
  };

  const handleTextChange = (idx, e) => {
    const value = e.target.value;
    setModes((prev) => {
      const copy = [...prev];
      copy[idx].value = value;
      return copy;
    });
  };

  return (
    <Box
      draggable={!isDropped}
      onDragStart={(e) => {
        if (!isDropped) {
          e.dataTransfer.setData(
            "application/json",
            JSON.stringify({ gridCount })
          );
        }
      }}
      sx={{
        padding: 2,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        cursor: "grab",
        border: isDropped ? "" : "1px solid #e5e7eb",
      }}
    >
      {isDropped && (
        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
          direction="right"
          sx={{
            pb: 1,
            "& .MuiFab-root": {
              width: 36,
              height: 36,
              minHeight: 36,
            },
          }}
          fabProps={{
            sx: {
              width: 36,
              height: 36,
              minHeight: 36,
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                setChildGrid(action.count);

                //  /   setChildGrid(null);
              }}
            />
          ))}
        </SpeedDial>
      )}

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
              backgroundColor:
                modes[idx].type === "empty" ? "#e6f2ff" : "transparent",
              border:
                modes[idx].type === "empty" ? "2px dashed #8ab6e6" : "none",
              borderRadius: 2,
              position: "relative",
              p: modes[idx].type !== "empty" ? 1 : 0,
            }}
          >
            {isDropped && modes[idx].type !== "empty" && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {modes[idx].type === "image" && (
                  <>
                    {modes[idx].file ? (
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: 6,
                          overflow: "hidden",
                          border: "1px solid #ccc",
                        }}
                      >
                        <img
                          src={modes[idx].file}
                          alt="uploaded"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          const url = URL.createObjectURL(file);

                          setModes((prev) => {
                            const copy = [...prev];
                            copy[idx].file = url;
                            return copy;
                          });
                        }}
                      />
                    )}
                  </>
                )}

                {modes[idx].type === "text" && (
                  <input
                    type="text"
                    placeholder="Type here..."
                    value={modes[idx].value}
                    onChange={(e) => handleTextChange(idx, e)}
                    style={{
                      width: "95%",
                      height: "60%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      outline: "none",
                      fontSize: 15,
                    }}
                  />
                )}

                {modes[idx].type === "button" && (
                  <button
                    style={{
                      padding: "6px 16px",
                      borderRadius: 8,
                      border: "none",
                      background: "#6d8ac7",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Button
                  </button>
                )}
              </Box>
            )}

            {isDropped && modes[idx].type === "empty" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 5,
                  gap: 3,
                }}
              >
                <Tooltip title="Image" placement="top">
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => updateMode(idx, "image")}
                  >
                    <ImageIcon size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>

                <Tooltip title="Text" placement="top">
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => updateMode(idx, "text")}
                  >
                    <TextT size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>

                <Tooltip title="Button" placement="top">
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => updateMode(idx, "button")}
                  >
                    <RadioButton size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {childGrid && <BoxComponent gridCount={childGrid} isDropped={true} />}
    </Box>
  );
};

export default BoxComponent;
