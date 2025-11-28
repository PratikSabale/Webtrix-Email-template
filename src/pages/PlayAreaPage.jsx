import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  draggedItemState,
  playAreaItemsWithHistoryState,
  selectedItemState,
} from "../recoil/layoutAtoms";
import { generateHTML } from "../utils/templateHTML";

export default function PlayAreaPage() {
  const draggedItem = useRecoilValue(draggedItemState); // toolbar item
  const [playAreaItems, setPlayAreaItems] = useRecoilState(
    playAreaItemsWithHistoryState
  );
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const textRefs = useRef({});
  const [draggedChild, setDraggedChild] = React.useState(null); // inner element drag

  // ROOT DROP — Add Container
  const handleRootDrop = () => {
    if (!draggedItem || draggedItem.type !== "Container") return;
    setPlayAreaItems((prev) => [
      ...prev,
      { id: Date.now(), type: "Container", gridColumns: 1, cells: [[]] },
    ]);
  };

  // Drop new elements (Paragraph/Title) inside cells from toolbar
  const handleDropNewChild = (containerId, cellIndex) => {
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

  // Move an existing child between cells
  const moveExistingChild = (
    fromContainerId,
    fromCellIndex,
    childId,
    toContainerId,
    toCellIndex
  ) => {
    setPlayAreaItems((prev) => {
      let movedChild = null;

      // remove from source
      const afterRemove = prev.map((container) => {
        if (container.id !== fromContainerId) return container;
        const newCells = container.cells.map((cell, idx) => {
          if (idx !== fromCellIndex) return cell;
          const filtered = cell.filter((ch) => {
            if (ch.id === childId) {
              movedChild = ch;
              return false;
            }
            return true;
          });
          return filtered;
        });
        return { ...container, cells: newCells };
      });

      if (!movedChild) return prev;

      // add to target
      return afterRemove.map((container) => {
        if (container.id !== toContainerId) return container;
        const newCells = container.cells.map((cell, idx) =>
          idx === toCellIndex ? [...cell, movedChild] : cell
        );
        return { ...container, cells: newCells };
      });
    });
  };

  // Apply style changes (do NOT touch content)
  useEffect(() => {
    if (!selectedItem?.id) return;
    setPlayAreaItems((prev) =>
      prev.map((container) => ({
        ...container,
        cells: container.cells.map((cell) =>
          cell.map((child) =>
            child.id === selectedItem.id
              ? {
                  ...child,
                  fontSize: selectedItem.fontSize,
                  fontWeight: selectedItem.fontWeight,
                  color: selectedItem.color,
                  textAlign: selectedItem.textAlign,
                  lineHeight: selectedItem.lineHeight ?? child.lineHeight,
                  margin: selectedItem.margin ?? child.margin,
                  padding: selectedItem.padding ?? child.padding,
                  fontFamily: selectedItem.fontFamily ?? child.fontFamily,
                  letterSpacing:
                    selectedItem.letterSpacing ?? child.letterSpacing,
                }
              : child
          )
        ),
      }))
    );
  }, [selectedItem]);

  // Store HTML in localStorage
  useEffect(() => {
    localStorage.setItem("emailTemplate", generateHTML(playAreaItems));
  }, [playAreaItems]);

  return (
    <div
      className="w-full md:w-[60%] min-h-[80%] bg-white border-2 border-dashed border-gray-600 overflow-y-auto relative mx-auto"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleRootDrop}
    >
      {playAreaItems.map((container) => (
        <div
          key={container.id}
          className={`mt-4 cursor-pointer rounded-md outline outline-1 outline-gray-300 mb-4 p-2 ${
            selectedItem?.id === container.id
              ? "outline-blue-500 outline-2"
              : ""
          }`}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelectedItem(container);
          }}
        >
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${container.cells.length}, 1fr)`,
            }}
          >
            {container.cells.map((cell, cellIndex) => (
              <div
                key={`${container.id}-col-${cellIndex}`}
                className="
                  outline outline-1 outline-dashed outline-gray-300
                  min-h-[80px] p-3 relative transition-all duration-200
                  hover:shadow-md hover:border-blue-400
                "
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const childData = e.dataTransfer.getData("child-drag");

                  if (childData) {
                    const [fromContainerId, fromCellIdxStr, childIdStr] =
                      childData.split(":");
                    moveExistingChild(
                      Number(fromContainerId),
                      Number(fromCellIdxStr),
                      Number(childIdStr),
                      container.id,
                      cellIndex
                    );
                    setDraggedChild(null);
                  } else {
                    handleDropNewChild(container.id, cellIndex);
                  }
                }}
              >
                {cell.length === 0 && (
                  <p className="text-gray-400 text-center mt-4 text-sm italic">
                    Drop elements here
                  </p>
                )}

                {cell.map((child) => (
                  <div
                    key={child.id}
                    className={`mb-2 p-2 rounded cursor-move transition-all ${
                      selectedItem?.id === child.id
                        ? "outline outline-2 outline-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData(
                        "child-drag",
                        `${container.id}:${cellIndex}:${child.id}`
                      );
                      setDraggedChild({
                        containerId: container.id,
                        cellIndex,
                        childId: child.id,
                      });
                    }}
                    onDragEnd={() => setDraggedChild(null)}
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
                        padding: 0,
                        margin: 0,
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
                        const updatedText = e.currentTarget.textContent || "";
                        setPlayAreaItems((prev) =>
                          prev.map((c) =>
                            c.id === container.id
                              ? {
                                  ...c,
                                  cells: c.cells.map((cCell, idx) =>
                                    idx === cellIndex
                                      ? cCell.map((ch) =>
                                          ch.id === child.id
                                            ? { ...ch, content: updatedText }
                                            : ch
                                        )
                                      : cCell
                                  ),
                                }
                              : c
                          )
                        );
                        setSelectedItem((prev) =>
                          prev && prev.id === child.id
                            ? { ...prev, content: updatedText }
                            : prev
                        );
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
