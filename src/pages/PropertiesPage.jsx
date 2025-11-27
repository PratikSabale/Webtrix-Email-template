import { useRecoilState } from "recoil";
import React from "react";
import {
  playAreaItemsWithHistoryState,
  selectedItemState,
} from "../recoil/layoutAtoms";

export default function PropertiesPanel() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [items, setItems] = useRecoilState(playAreaItemsWithHistoryState);

  const PANEL_WIDTH = 320;

  if (!selectedItem)
    return (
      <div className="w-[320px] p-6 rounded-xl text-center h-full backdrop-blur-md bg-white/60 border">
        <h2 className="text-xl font-semibold">No item selected</h2>
        <p className="text-gray-500 text-sm">
          Click any item inside the play area
        </p>
      </div>
    );

  const updateItem = (updates) => {
    setItems((prev) =>
      prev.map((container) => {
        const isTarget = container.id === selectedItem.id;

        if (isTarget) {
          if (updates.gridColumns) {
            const newCols = updates.gridColumns;
            const oldCols = container.cells.length;

            let newCells = [...container.cells];

            if (newCols > oldCols) {
              while (newCells.length < newCols) newCells.push([]);
            }

            if (newCols < oldCols) {
              const removedCells = newCells.slice(newCols);
              removedCells.forEach((cell) => {
                newCells[0] = [...newCells[0], ...cell];
              });
              newCells = newCells.slice(0, newCols);
            }

            return {
              ...container,
              ...updates,
              cells: newCells,
            };
          }

          return { ...container, ...updates };
        }

        return {
          ...container,
          cells: container.cells?.map((cell) =>
            cell.map((child) =>
              child.id === selectedItem.id ? { ...child, ...updates } : child
            )
          ),
        };
      })
    );

    setSelectedItem((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div
      className="
        w-[320px] p-6 rounded-xl h-full overflow-y-auto
        bg-white/70 backdrop-blur-xl border shadow
      "
    >
      <h2 className="text-xl font-bold mb-4">Properties</h2>

      {/* ---------------- Container Settings ---------------- */}
      {selectedItem.type === "Container" && (
        <>
          <h3 className="font-semibold mb-1">Container Settings</h3>

          <label className="text-sm font-medium mb-1 block">Grid Columns</label>

          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((col) => (
              <button
                key={col}
                className={`px-4 py-2 rounded border ${
                  selectedItem.gridColumns === col
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
                onClick={() => updateItem({ gridColumns: col })}
              >
                {col}
              </button>
            ))}
          </div>

          <hr className="my-4" />
        </>
      )}

      {/* ---------------- Paragraph / Title Settings ---------------- */}
      {(selectedItem.type === "Paragraph" || selectedItem.type === "Title") && (
        <>
          <h3 className="font-semibold mb-1">{selectedItem.type} Settings</h3>

          {/* Heading Tag */}
          {selectedItem.type === "Title" && (
            <>
              <label className="text-sm font-medium block mb-1">
                Heading Tag
              </label>
              <select
                className="w-full border p-2 rounded mb-2"
                value={selectedItem.headingTag || "h3"}
                onChange={(e) => {
                  const tag = e.target.value;
                  const headingSizes = {
                    h1: 32,
                    h2: 28,
                    h3: 24,
                    h4: 20,
                    h5: 18,
                    h6: 16,
                  };

                  updateItem({
                    headingTag: tag,
                    fontSize: headingSizes[tag],
                  });
                }}
              >
                {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
                  <option key={tag} value={tag}>
                    {tag.toUpperCase()}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Paragraph Font Size */}
          {selectedItem.type === "Paragraph" && (
            <>
              <label className="text-sm font-medium mb-1 block">
                Font Size
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded mb-2"
                value={selectedItem.fontSize || 16}
                onChange={(e) =>
                  updateItem({ fontSize: parseInt(e.target.value) })
                }
              />
            </>
          )}

          {/* Font Weight */}
          <label className="text-sm font-medium mb-1 block">Font Weight</label>
          <select
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.fontWeight || "400"}
            onChange={(e) => updateItem({ fontWeight: e.target.value })}
          >
            {["300", "400", "500", "600", "700", "800", "900"].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          {/* Text Align */}
          <label className="text-sm font-medium mb-1 block">Text Align</label>
          <select
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.textAlign || "left"}
            onChange={(e) => updateItem({ textAlign: e.target.value })}
          >
            {["left", "center", "right", "justify"].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {/* Color */}
          <label className="text-sm font-medium mb-1 block">Color</label>
          <input
            type="color"
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.color || "#000000"}
            onChange={(e) => updateItem({ color: e.target.value })}
          />

          {/* Line Height */}
          <label className="text-sm font-medium mb-1 block">Line Height</label>
          <input
            type="number"
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.lineHeight || 1.5}
            onChange={(e) =>
              updateItem({ lineHeight: parseFloat(e.target.value) })
            }
          />

          {/* Letter Spacing */}
          <label className="text-sm font-medium mb-1 block">
            Letter Spacing
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.letterSpacing || 0}
            onChange={(e) =>
              updateItem({ letterSpacing: parseFloat(e.target.value) })
            }
          />

          {/* Font Family */}
          <label className="text-sm font-medium mb-1 block">Font Family</label>
          <select
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.fontFamily || "Arial"}
            onChange={(e) => updateItem({ fontFamily: e.target.value })}
          >
            {[
              "Arial",
              "Roboto",
              "Poppins",
              "Montserrat",
              "Times New Roman",
              "Georgia",
            ].map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

          {/* Margin */}
          <label className="text-sm font-medium mb-1 block">Margin</label>
          <input
            type="number"
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.margin || 0}
            onChange={(e) => updateItem({ margin: parseInt(e.target.value) })}
          />

          {/* Padding */}
          <label className="text-sm font-medium mb-1 block">Padding</label>
          <input
            type="number"
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.padding || 0}
            onChange={(e) => updateItem({ padding: parseInt(e.target.value) })}
          />

          <hr className="my-4" />
        </>
      )}

      {/* ---------------- Image Settings ---------------- */}
      {selectedItem.type === "Image" && (
        <>
          <h3 className="font-semibold mb-1">Image Settings</h3>

          <label className="text-sm font-medium mb-1 block">Width</label>
          <input
            type="range"
            min={50}
            max={1000}
            value={selectedItem.width || 200}
            onChange={(e) => updateItem({ width: Number(e.target.value) })}
            className="w-full mb-2"
          />

          <label className="text-sm font-medium mb-1 block">Height</label>
          <input
            type="range"
            min={50}
            max={1000}
            value={selectedItem.height || 200}
            onChange={(e) => updateItem({ height: Number(e.target.value) })}
            className="w-full mb-2"
          />

          <label className="text-sm font-medium mb-1 block">
            Border Radius
          </label>
          <input
            type="range"
            min={0}
            max={50}
            value={selectedItem.borderRadius || 0}
            onChange={(e) =>
              updateItem({ borderRadius: Number(e.target.value) })
            }
            className="w-full mb-2"
          />

          <label className="text-sm font-medium mb-1 block">Object Fit</label>
          <select
            className="w-full border p-2 rounded mb-2"
            value={selectedItem.objectFit || "cover"}
            onChange={(e) => updateItem({ objectFit: e.target.value })}
          >
            {["cover", "contain", "fill", "none"].map((fit) => (
              <option key={fit} value={fit}>
                {fit}
              </option>
            ))}
          </select>

          <hr className="my-4" />
        </>
      )}

      {/* ---------------- Video Settings ---------------- */}
      {selectedItem.type === "Video" && (
        <>
          <h3 className="font-semibold mb-1">Video Settings</h3>

          <label className="text-sm font-medium mb-1 block">Width</label>
          <input
            type="range"
            min={50}
            max={1000}
            value={selectedItem.width || 400}
            onChange={(e) => updateItem({ width: Number(e.target.value) })}
            className="w-full mb-2"
          />

          <label className="text-sm font-medium mb-1 block">Height</label>
          <input
            type="range"
            min={50}
            max={1000}
            value={selectedItem.height || 300}
            onChange={(e) => updateItem({ height: Number(e.target.value) })}
            className="w-full mb-2"
          />

          <label className="text-sm font-medium mb-1 block flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItem.autoplay || false}
              onChange={(e) => updateItem({ autoplay: e.target.checked })}
            />
            Autoplay
          </label>

          <label className="text-sm font-medium mb-1 block flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItem.loop || false}
              onChange={(e) => updateItem({ loop: e.target.checked })}
            />
            Loop
          </label>

          <hr className="my-4" />
        </>
      )}

      {/* ---------------- Space Settings ---------------- */}
      {selectedItem.type === "Space" && (
        <>
          <h3 className="font-semibold mb-1">Space Settings</h3>

          <label className="text-sm font-medium mb-1 block">Height</label>
          <input
            type="range"
            min={10}
            max={500}
            value={selectedItem.height || 50}
            onChange={(e) => updateItem({ height: Number(e.target.value) })}
            className="w-full mb-2"
          />
        </>
      )}
    </div>
  );
}
