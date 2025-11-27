import React from "react";
import { useSetRecoilState } from "recoil";
import { draggedItemState } from "../../recoil/layoutAtoms";

const items = [
  { label: "Container", type: "Container" },
  { label: "Title", type: "Title" },
  { label: "Image", type: "Image" },
  { label: "Paragraph", type: "Paragraph" },
  { label: "Video", type: "Video" },
  { label: "Space", type: "Space" },
];

export default function SidebarPage() {
  const setDraggedItem = useSetRecoilState(draggedItemState);

  const handleDragStart = (type) => {
    setDraggedItem({ type });
  };

  return (
    <div className="p-6 w-[260px] m-3 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Sidebar</h2>

      {items.map((item) => (
        <div
          key={item.type}
          className="p-3 mt-3 text-center cursor-grab select-none bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
          draggable
          onDragStart={() => handleDragStart(item.type)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
