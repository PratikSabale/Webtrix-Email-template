import React from "react";
import webtrixLogo from "../../assets/webtrix-logo.png";
import { useNavigate } from "react-router-dom";
import { PreviewRounded, Undo, Redo } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { undoState, redoState } from "../../recoil/layoutAtoms";

const Nav = () => {
  const navigate = useNavigate();

  const undo = useSetRecoilState(undoState);
  const redo = useSetRecoilState(redoState);

  return (
    <div className="w-full flex items-center justify-between bg-white px-4 py-2">
      {/* Left - Logo */}
      <img
        src={webtrixLogo}
        className="w-10 h-10 cursor-pointer object-contain"
        onClick={() => navigate("/")}
      />

      {/* Center - Undo / Redo */}
      <div className="flex gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={undo}
        >
          <Undo style={{ fontSize: 28 }} />
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={redo}
        >
          <Redo style={{ fontSize: 28 }} />
        </button>
      </div>

      {/* Right - Preview */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => navigate("/preview")}
      >
        <PreviewRounded style={{ fontSize: 32 }} />
      </button>
    </div>
  );
};

export default Nav;
