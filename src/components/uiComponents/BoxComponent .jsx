// import React, { useState } from "react";
// import { Box, Tooltip } from "@mui/material";
// import { Image as ImageIcon, TextT, RadioButton } from "phosphor-react";

// const BoxComponent = ({ gridCount, isDropped }) => {
//   const [mode, setMode] = useState("empty");
//   return (
//     <Box
//       draggable
//       onDragStart={(e) =>
//         e.dataTransfer.setData(
//           "application/json",
//           JSON.stringify({ gridCount })
//         )
//       }
//       sx={{
//         padding: 2,
//         backgroundColor: "#ffffff",
//         borderRadius: 3,
//         cursor: "grab",
//         mb: 2,
//         border: "1px solid #e5e7eb",
//       }}
//     >
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
//           gap: 1.5,
//         }}
//       >
//         {Array.from({ length: gridCount }).map((_, idx) => (
//           <Box
//             key={idx}
//             sx={{
//               height: isDropped ? 100 : 50,
//               backgroundColor: "#e6f2ff",
//               border: "2px dashed #8ab6e6",
//               borderRadius: 2,
//             }}
//           >
//             {isDropped && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   m: 5,
//                   gap: 3,
//                 }}
//               >
//                 <Tooltip title="image" placement="top">
//                   <Box
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => setMode("image")}
//                   >
//                     <ImageIcon size={22} color="#6d8ac7" />
//                   </Box>
//                 </Tooltip>
//                 <Tooltip title="Text" placement="top">
//                   <Box
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => setMode("text")}
//                   >
//                     <TextT size={22} color="#6d8ac7" />
//                   </Box>
//                 </Tooltip>

//                 <Tooltip title="Button" placement="top">
//                   <Box
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => setMode("button")}
//                   >
//                     <RadioButton size={22} color="#6d8ac7" />
//                   </Box>
//                 </Tooltip>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default BoxComponent;
import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { Image as ImageIcon, TextT, RadioButton } from "phosphor-react";

const BoxComponent = ({ gridCount, isDropped }) => {
  const [mode, setMode] = useState("empty"); // image | text | button | empty

  return (
    <Box
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ gridCount })
        )
      }
      sx={{
        padding: 2,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        cursor: "grab",
        mb: 2,
        border: "1px solid #e5e7eb",
      }}
    >
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
              backgroundColor: "#e6f2ff",
              border: "2px dashed #8ab6e6",
              borderRadius: 2,
              position: "relative",
            }}
          >
            {/* 🟦 RENDER CONTENT INSIDE DROPPED BOX BASED ON MODE */}
            {isDropped && mode !== "empty" && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {mode === "image" && (
                  <img
                    src="https://via.placeholder.com/80"
                    alt="placeholder"
                    style={{ borderRadius: 8 }}
                  />
                )}

                {mode === "text" && (
                  <Box sx={{ fontSize: 16, fontWeight: 600, color: "#444" }}>
                    Sample Text
                  </Box>
                )}

                {mode === "button" && (
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

            {/* 🟦 ACTION ICONS (Only show when dropped & empty mode) */}
            {isDropped && mode === "empty" && (
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
                    onClick={() => setMode("image")}
                  >
                    <ImageIcon size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>

                <Tooltip title="Text" placement="top">
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => setMode("text")}
                  >
                    <TextT size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>

                <Tooltip title="Button" placement="top">
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => setMode("button")}
                  >
                    <RadioButton size={22} color="#6d8ac7" />
                  </Box>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BoxComponent;
