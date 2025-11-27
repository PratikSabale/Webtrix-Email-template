import React, { useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  draggedItemState,
  playAreaItemsState,
  selectedItemState,
} from "../recoil/layoutAtoms";

export default function PlayAreaPage() {
  const draggedItem = useRecoilValue(draggedItemState);
  const [playAreaItems, setPlayAreaItems] = useRecoilState(playAreaItemsState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  const textRefs = useRef({});

  // ROOT DROP — Container Only
  const handleRootDrop = () => {
    if (!draggedItem || draggedItem.type !== "Container") return;

    setPlayAreaItems((prev) => [
      ...prev,
      { id: Date.now(), type: "Container", gridColumns: 1, children: [] },
    ]);
  };

  // DROP INSIDE CONTAINER — Child Elements
  const handleDropInsideContainer = (containerId) => {
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
      prev.map((box) =>
        box.id === containerId
          ? { ...box, children: [...box.children, newChild] }
          : box
      )
    );
  };

  // APPLY STYLE CHANGES (SAFE)
  React.useEffect(() => {
    if (!selectedItem || !selectedItem.id) return;

    setPlayAreaItems((prev) =>
      prev.map((container) => ({
        ...container,
        children: container.children.map((child) =>
          child.id === selectedItem.id
            ? { ...child, ...selectedItem } // only override props, not structure
            : child
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

      {/* CONTAINERS */}
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
          <Typography variant="subtitle1">Container</Typography>

          {/* CHILDREN GRID */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: "2px dashed #aaa",
              minHeight: "80px",
              display: "grid",
              gridTemplateColumns: `repeat(${container.gridColumns}, 1fr)`,
              gap: 1.5,
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropInsideContainer(container.id)}
          >
            {container.children.map((child) => (
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
                {/* CONTENT EDITABLE TEXT */}
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
                  }}
                  onFocus={(e) => {
                    if (
                      child.content === "Add your text here" ||
                      child.content === "Add your title here"
                    ) {
                      e.currentTarget.textContent = "";
                    }
                  }}
                  onInput={(e) => {}}
                  onBlur={(e) => {
                    const updatedText = e.currentTarget.textContent;

                    // UPDATE CHILD ONLY (SAFE)
                    setPlayAreaItems((prev) =>
                      prev.map((box) =>
                        box.id === container.id
                          ? {
                              ...box,
                              children: box.children.map((c) =>
                                c.id === child.id
                                  ? { ...c, content: updatedText }
                                  : c
                              ),
                            }
                          : box
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
          </Box>
        </Paper>
      ))}
    </Paper>
  );
}
