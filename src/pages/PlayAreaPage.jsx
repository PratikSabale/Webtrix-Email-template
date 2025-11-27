import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  draggedItemState,
  playAreaItemsWithHistoryState,
  selectedItemState,
} from "../recoil/layoutAtoms";
import { generateHTML } from "../utils/templateHTML";

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

  useEffect(() => {
    const html = generateHTML(playAreaItems);
    localStorage.setItem("emailTemplate", html);
  }, [playAreaItems]);

  return (
    <div
      className="
        w-full md:w-[60%] min-h-[80%] bg-white p-6 border-2 border-dashed border-gray-600 
        overflow-y-auto relative
      "
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleRootDrop}
    >
      {playAreaItems.map((container) => (
        <div
          key={container.id}
          className={`
            p-4 mt-4 border-2 cursor-pointer rounded-md 
            ${
              selectedItem?.id === container.id
                ? "border-blue-500"
                : "border-gray-600"
            }
          `}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelectedItem(container);
          }}
        >
          <div
            className="
              min-h-[80px] grid gap-4 
            "
            style={{
              gridTemplateColumns: `repeat(${container.gridColumns}, 1fr)`,
            }}
          >
            {container.cells.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="p-2 border border-dashed border-gray-300 min-h-[80px] flex flex-col gap-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropInsideCell(container.id, cellIndex)}
              >
                {cell.length === 0 && (
                  <p className="text-gray-400 text-center mt-2 text-sm">
                    Drop elements here
                  </p>
                )}

                {cell.map((child) => (
                  <div
                    key={child.id}
                    className={`
                      p-4  rounded border cursor-pointer 
                      ${
                        selectedItem?.id === child.id
                          ? "border-2 border-blue-500"
                          : "border border-gray-300"
                      }
                    `}
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
