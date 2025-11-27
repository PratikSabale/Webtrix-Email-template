import React from "react";
import webtrixLogo from "../../assets/webtrix-logo.png";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { undoState, redoState } from "../../recoil/layoutAtoms";

const Nav = () => {
  const navigate = useNavigate();

  const undo = useSetRecoilState(undoState);
  const redo = useSetRecoilState(redoState);

  return (
    <div className="w-full flex items-center justify-between bg-white px-4 py-2 shadow-sm">
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
          Undo
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={redo}
        >
          Redo
        </button>
      </div>

      {/* Right - Preview */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => navigate("/preview")}
      >
        {/* Preview / Eye SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Nav;
