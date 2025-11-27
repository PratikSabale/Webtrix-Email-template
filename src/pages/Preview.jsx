import React, { useState, useRef } from "react";
import {
  FiArrowLeft,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
  FiRotateCw,
} from "react-icons/fi"; // Feather Icons
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [device, setDevice] = useState("desktop");
  const [orientation, setOrientation] = useState("portrait");
  const [zoom, setZoom] = useState(1);

  const rawHTML =
    localStorage.getItem("emailTemplate") ||
    `<div style="padding:20px;font-family:Arial">
      <h2>Email Preview</h2>
      <p>No template data found.</p>
    </div>`;

  const emailHTML = `
    <html><head><style>
    html,body{margin:0;padding:0;height:auto;max-height:100%;overflow-y:auto;overscroll-behavior:none;-webkit-overflow-scrolling:touch;}
    ${
      device === "mobile"
        ? `body::-webkit-scrollbar{width:0;background:transparent;} body{scrollbar-width:none;-ms-overflow-style:none;}`
        : ""
    }
    </style></head><body>${rawHTML}</body></html>
  `;

  const getDeviceSize = () => {
    if (device === "desktop") return { width: 1280, height: 800 };
    if (device === "tablet")
      return orientation === "portrait"
        ? { width: 810, height: 1080 }
        : { width: 1080, height: 810 };
    return orientation === "portrait"
      ? { width: 390, height: 844 }
      : { width: 844, height: 390 };
  };

  const { width, height } = getDeviceSize();

  const getAutoFitScale = () => {
    if (!containerRef.current) return 1;
    const cw = containerRef.current.clientWidth - 80;
    const ch = containerRef.current.clientHeight - 80;
    return Math.min(cw / width, ch / height, 1);
  };

  const autoFitScale = getAutoFitScale();

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="h-screen bg-gray-100">
      {/* ===== TOP NAV ===== */}
      <div className="bg-white flex items-center justify-between px-4 py-2 border-b border-gray-300">
        {/* Back + Title */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft size={28} />
          </button>
          <p className="font-semibold">Email Preview</p>
        </div>

        {/* Device buttons */}
        <div className="flex items-center gap-2">
          <button onClick={() => setDevice("desktop")}>
            <FiMonitor size={28} />
          </button>
          <button onClick={() => setDevice("tablet")}>
            <FiTablet size={28} />
          </button>
          <button onClick={() => setDevice("mobile")}>
            <FiSmartphone size={28} />
          </button>

          {device !== "desktop" && (
            <button
              onClick={() =>
                setOrientation((o) =>
                  o === "portrait" ? "landscape" : "portrait"
                )
              }
            >
              <FiRotateCw size={28} />
            </button>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button onClick={handleZoomOut}>
            <FiZoomOut size={28} />
          </button>

          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-28"
          />

          <button onClick={handleZoomIn}>
            <FiZoomIn size={28} />
          </button>

          <button onClick={handleZoomReset}>
            <FiRefreshCw size={28} />
          </button>
        </div>
      </div>

      {/* ===== MAIN PREVIEW CONTAINER ===== */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden"
      >
        <div
          style={{
            width,
            height,
            transform: `scale(${zoom * autoFitScale})`,
          }}
          className={`
            bg-white overflow-hidden shadow-xl
            ${
              device === "desktop"
                ? "rounded-md border-[10px] border-gray-800"
                : device === "tablet"
                ? "rounded-xl border-[12px] border-gray-700"
                : "rounded-2xl border-[14px] border-gray-900"
            }
          `}
        >
          {/* Fake device top bar */}
          <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 text-sm font-semibold">
            User / Organization Name
          </div>

          {/* Email content preview */}
          <iframe
            title="Email Preview"
            srcDoc={emailHTML}
            className="w-full h-full border-none"
            style={{ overscrollBehavior: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
