import React, { useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  draggedItemState,
  playAreaItemsWithHistoryState,
  selectedItemState,
} from "../recoil/layoutAtoms";

export default function PlayAreaPage() {
  const draggedItem = useRecoilValue(draggedItemState);
  const [playAreaItems, setPlayAreaItems] = useRecoilState(
    playAreaItemsWithHistoryState
  );
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const textRefs = useRef({});

  // ROOT DROP — Add Container
  const handleRootDrop = () => {
    if (!draggedItem || draggedItem.type !== "Container") return;

    setPlayAreaItems((prev) => [
      ...prev,
      { id: Date.now(), type: "Container", gridColumns: 1, cells: [[]] },
    ]);
  };

  // DROP CHILD ELEMENT INSIDE SPECIFIC CELL
  const handleDropInsideCell = (containerId, cellIndex) => {
    if (!draggedItem || draggedItem.type === "Container") return;

    const defaults = {
      Paragraph: {
        content: "Add your text here",
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        textAlign: "left",
      },
      Title: {
        content: "Add your title here",
        fontSize: 24,
        fontWeight: "600",
        color: "#000",
        textAlign: "left",
      },
    };

    const newChild = {
      id: Date.now(),
      type: draggedItem.type,
      ...(defaults[draggedItem.type] || {}),
    };

    setPlayAreaItems((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cells: container.cells.map((cell, idx) =>
                idx === cellIndex ? [...cell, newChild] : cell
              ),
            }
          : container
      )
    );
  };

  // APPLY STYLE CHANGES
  React.useEffect(() => {
    if (!selectedItem || !selectedItem.id) return;

    setPlayAreaItems((prev) =>
      prev.map((container) => ({
        ...container,
        cells: container.cells.map((cell) =>
          cell.map((child) =>
            child.id === selectedItem.id ? { ...child, ...selectedItem } : child
          )
        ),
      }))
    );
  }, [selectedItem]);

  return (
    <Paper
      sx={{
        width: { xs: "100%", sm: "100%", md: "60%" },
        minHeight: "80%",
        background: "#fff",
        p: 2.5,
        border: "2px dashed #777",
        overflowY: "auto",
        left: { xs: 0, md: 60 },
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleRootDrop}
    >
      <Typography variant="h6" textAlign="center">
        Play Area
      </Typography>

      {playAreaItems.map((container) => (
        <Paper
          key={container.id}
          sx={{
            p: 2,
            mt: 2,
            border:
              selectedItem?.id === container.id
                ? "2px solid blue"
                : "2px solid #555",
            cursor: "pointer",
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelectedItem(container);
          }}
        >
          <Box
            sx={{
              mt: 2,
              p: 2,
              // border: "2px dashed #aaa",
              minHeight: "80px",
              display: "grid",
              gridTemplateColumns: `repeat(${container.gridColumns}, 1fr)`,
              gap: 1.5,
            }}
          >
            {container.cells.map((cell, cellIndex) => (
              <Paper
                key={cellIndex}
                sx={{
                  p: 1,
                  border: "1px dashed #ccc",
                  minHeight: "80px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  boxShadow: 0,
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropInsideCell(container.id, cellIndex)}
              >
                {cell.length === 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#999", textAlign: "center", mt: 2 }}
                  >
                    Drop elements here
                  </Typography>
                )}

                {cell.map((child) => (
                  <Paper
                    key={child.id}
                    sx={{
                      p: 2,
                      mt: 1,
                      border:
                        selectedItem?.id === child.id
                          ? "2px solid blue"
                          : "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedItem(child);
                    }}
                  >
                    <div
                      ref={(el) => (textRefs.current[child.id] = el)}
                      contentEditable={
                        child.type === "Paragraph" || child.type === "Title"
                      }
                      suppressContentEditableWarning
                      style={{
                        fontSize: `${child.fontSize}px`,
                        fontWeight: child.fontWeight,
                        color: child.color,
                        textAlign: child.textAlign,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        if (
                          child.content === "Add your text here" ||
                          child.content === "Add your title here"
                        ) {
                          e.currentTarget.textContent = "";
                        }
                      }}
                      onBlur={(e) => {
                        const updatedText = e.currentTarget.textContent;
                        setPlayAreaItems((prev) =>
                          prev.map((c) =>
                            c.id === container.id
                              ? {
                                  ...c,
                                  cells: c.cells.map((cell) =>
                                    cell.map((ch) =>
                                      ch.id === child.id
                                        ? { ...ch, content: updatedText }
                                        : ch
                                    )
                                  ),
                                }
                              : c
                          )
                        );
                        setSelectedItem((prev) => ({
                          ...prev,
                          content: updatedText,
                        }));
                      }}
                    >
                      {child.content}
                    </div>
                  </Paper>
                ))}
              </Paper>
            ))}
          </Box>
        </Paper>
      ))}
    </Paper>
  );
}
