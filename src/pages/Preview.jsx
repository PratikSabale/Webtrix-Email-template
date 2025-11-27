import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { playAreaItemsWithHistoryState } from "../recoil/layoutAtoms";
import { generateHTML } from "../utils/templateHTML";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
} from "react-icons/fi";

const Preview = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const playAreaItems = useRecoilValue(playAreaItemsWithHistoryState);
  const rawHTML = generateHTML(playAreaItems);

  const [device, setDevice] = useState("desktop");
  const [orientation, setOrientation] = useState("portrait");

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

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(rawHTML);
    alert("HTML copied to clipboard!");
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft size={28} />
          </button>
          <p className="font-semibold">Email Preview</p>
        </div>

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

          <button
            onClick={handleCopyHTML}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Copy HTML
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden"
      >
        <div
          style={{
            width,
            height,
            transform: `scale(${autoFitScale})`,
          }}
          className={`bg-white overflow-hidden shadow-xl ${
            device === "desktop"
              ? "rounded-md border-[10px] border-gray-800"
              : device === "tablet"
              ? "rounded-xl border-[12px] border-gray-700"
              : "rounded-2xl border-[14px] border-gray-900"
          }`}
        >
          <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 text-sm font-semibold">
            User / Organization Name
          </div>

          {/* UPDATED IFRAME (ONLY CHANGE) */}
          <iframe
            title="Email Preview"
            srcDoc={`<html>
                        <head>
                          <style>
                            html,body{
                              margin:0;
                              padding:0;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="template-wrapper">
                            ${rawHTML}
                          </div>
                        </body>
                      </html>`}
            className="w-full h-full border-none"
            style={{ overscrollBehavior: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
