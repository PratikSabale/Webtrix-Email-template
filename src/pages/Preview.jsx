import React, { useState, useRef } from "react";
import { Box, IconButton, Typography, Slider, Tooltip } from "@mui/material";
import { ArrowBack, Monitor, PhoneAndroid, Tablet, ZoomIn, ZoomOut, Refresh, ScreenRotation } from "@mui/icons-material";
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
    <p>For those who are interested in finding random paragraphs, that's exactly what this webpage provides. If both a random word and a random sentence aren't quite long enough for your needs, then a random paragraph might be the perfect solution. Once you arrive at this page, you'll see a random paragraph. If you need another one, all you need to do is click on the "next paragraph" button. If you happen to need several random paragraphs all at once, you can use this other paragraph generator. Below you can find a number of ways that this generator can be used.
        There are a number of reasons you may need a block of text and when you do, a random paragraph can be the perfect solution. If you happen to be a web designer and you need some random text to show in your layout, a random paragraph can be an excellent way to do this. If you're a programmer and you need random text to test the program, using these paragraphs can be the perfect way to do this. Anyone who's in search of realistic text for a project can use one or more of these random paragraphs to fill their need.
        For writers looking for a way to get their creative writing juices flowing, using a random paragraph can be a great way to do this. One of the great benefits of this tool is that nobody knows what is going to appear in the paragraph. This can be leveraged in a few different ways to force the writer to use creativity. For example, the random paragraph can be used as the beginning paragraph of a story that the writer must finish. I can also be used as a paragraph somewhere inside a short story, or for a more difficult creative challenge, it can be used as the ending paragraph. In every case, the writer is forced to use creativity to incorporate the random paragraph into the story.
        For some writers, it isn't getting the original words on paper that's the challenge, but rewriting the first and second drafts. Using the random paragraph generator can be a good way to get into a rewriting routine before beginning the project. In this case, you take the random paragraph and rewrite it so it retains the same meaning, but does so in a better and more concise way. Beginning the day doing this with a random paragraph can make the rewriting of an article, short story, or chapter of a book much easier than trying to begin directly with it.
        When it comes to writers' block, often the most difficult part is simply beginning to put words to paper. One way that can often help is to write about something completely different from what you're having the writers' block about. This is where a random paragraph can be quite helpful. By using this tool you can begin to chip away at the writers' block by simply adding to the random paragraph that appears with the knowledge that it's going to be completely different from any writing you've been doing. Then once you begin to put words on the paper, it should be easier to transition into the writing that needs to get done.
        For those who are looking for a difficult writing challenge, the random paragraph generator can provide that as well. Instead of writing about the entire paragraph, take each sentence in the paragraph and make each of those individual sentences the first or last sentence of each paragraph of a short story. Trying this difficult writing challenge should stretch your creativity to the limit.
        The best way to use these random paragraphs is to generate a few and see how they can help with whatever project you're currently pursuing. You should be able to figure out quickly if this tool will be beneficial for your project or needs. Often times the best way to see if it's what you've been looking for is to use it and find out for yourself.
        We're always seeking constructive ideas on how we can improve our random paragraph generator. If you have used this tool and have an idea on how we could improve it for the benefit of everyone, we'd love to hear from you. Take a moment to email us with your ideas so we can consider them for future updates.
        For those who are interested in finding random paragraphs, that's exactly what this webpage provides. If both a random word and a random sentence aren't quite long enough for your needs, then a random paragraph might be the perfect solution. Once you arrive at this page, you'll see a random paragraph. If you need another one, all you need to do is click on the "next paragraph" button. If you happen to need several random paragraphs all at once, you can use this other paragraph generator. Below you can find a number of ways that this generator can be used.
        There are a number of reasons you may need a block of text and when you do, a random paragraph can be the perfect solution. If you happen to be a web designer and you need some random text to show in your layout, a random paragraph can be an excellent way to do this. If you're a programmer and you need random text to test the program, using these paragraphs can be the perfect way to do this. Anyone who's in search of realistic text for a project can use one or more of these random paragraphs to fill their need.
        For writers looking for a way to get their creative writing juices flowing, using a random paragraph can be a great way to do this. One of the great benefits of this tool is that nobody knows what is going to appear in the paragraph. This can be leveraged in a few different ways to force the writer to use creativity. For example, the random paragraph can be used as the beginning paragraph of a story that the writer must finish. I can also be used as a paragraph somewhere inside a short story, or for a more difficult creative challenge, it can be used as the ending paragraph. In every case, the writer is forced to use creativity to incorporate the random paragraph into the story.           For some writers, it isn't getting the original words on paper that's the challenge, but rewriting the first and second drafts. Using the random paragraph generator can be a good way to get into a rewriting routine before beginning the project. In this case, you take the random paragraph and rewrite it so it retains the same meaning, but does so in a better and more concise way. Beginning the day doing this with a random paragraph can make the rewriting of an article, short story, or chapter of a book much easier than trying to begin directly with it.
        When it comes to writers' block, often the most difficult part is simply beginning to put words to paper. One way that can often help is to write about something completely different from what you're having the writers' block about. This is where a random paragraph can be quite helpful. By using this tool you can begin to chip away at the writers' block by simply adding to the random paragraph that appears with the knowledge that it's going to be completely different from any writing you've been doing. Then once you begin to put words on the paper, it should be easier to transition into the writing that needs to get done.
        For those who are looking for a difficult writing challenge, the random paragraph generator can provide that as well. Instead of writing about the entire paragraph, take each sentence in the paragraph and make each of those individual sentences the first or last sentence of each paragraph of a short story. Trying this difficult writing challenge should stretch your creativity to the limit.
        The best way to use these random paragraphs is to generate a few and see how they can help with whatever project you're currently pursuing. You should be able to figure out quickly if this tool will be beneficial for your project or needs. Often times the best way to see if it's what you've been looking for is to use it and find out for yourself.
        We're always seeking constructive ideas on how we can improve our random paragraph generator. If you have used this tool and have an idea on how we could improve it for the benefit of everyone, we'd love to hear from you. Take a moment to email us with your ideas so we can consider them for future updates.
      </p>
    </div>`;

  /* ===== iOS MOMENTUM WITHOUT OVERSCROLL ===== */
  const emailHTML = `
    <html><head><style>
    html,body{margin:0;padding:0;height:auto;max-height:100%;overflow-y:auto;overscroll-behavior:none;-webkit-overflow-scrolling:touch;}
    ${device === "mobile" ? `body::-webkit-scrollbar{width:0;background:transparent;} body{scrollbar-width:none;-ms-overflow-style:none;}` : ""}
    </style></head><body>${rawHTML}</body></html>
  `;

  /* ===== DEVICE SIZES ===== */
  const getDeviceSize = () => {
    if (device === "desktop") return { width: 1280, height: 800 };
    if (device === "tablet") return orientation === "portrait" ? { width: 810, height: 1080 } : { width: 1080, height: 810 };
    return orientation === "portrait" ? { width: 390, height: 844 } : { width: 844, height: 390 };
  };

  const { width, height } = getDeviceSize();

  /* ===== AUTO FIT SCALE ===== */
  const getAutoFitScale = () => {
    if (!containerRef.current) return 1;
    const cw = containerRef.current.clientWidth - 80, ch = containerRef.current.clientHeight - 80;
    return Math.min(cw / width, ch / height, 1);
  };

  const autoFitScale = getAutoFitScale();

  /* ===== ZOOM ===== */
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f4f6f8" }}>
      <Box sx={{ bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1, borderBottom: "1px solid #ddd" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
          <Typography sx={{ fontWeight: 600 }}>Email Preview</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Desktop"><IconButton onClick={() => setDevice("desktop")}><Monitor /></IconButton></Tooltip>
          <Tooltip title="Tablet"><IconButton onClick={() => setDevice("tablet")}><Tablet /></IconButton></Tooltip>
          <Tooltip title="Mobile"><IconButton onClick={() => setDevice("mobile")}><PhoneAndroid /></IconButton></Tooltip>
          {device !== "desktop" && <Tooltip title="Rotate"><IconButton onClick={() => setOrientation(o => (o === "portrait" ? "landscape" : "portrait"))}><ScreenRotation /></IconButton></Tooltip>}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleZoomOut}><ZoomOut /></IconButton>
          <Slider value={zoom} min={0.5} max={2} step={0.1} onChange={(e, v) => setZoom(v)} sx={{ width: 100 }} />
          <IconButton onClick={handleZoomIn}><ZoomIn /></IconButton>
          <IconButton onClick={handleZoomReset}><Refresh /></IconButton>
        </Box>
      </Box>

      <Box ref={containerRef} sx={{ height: "calc(100vh - 64px)", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        <Box sx={{ width, height, bgcolor: "#fff", overflow: "hidden", boxShadow: 6, borderRadius: device === "desktop" ? 3 : device === "tablet" ? 6 : 8, border: device === "desktop" ? "10px solid #222" : device === "tablet" ? "12px solid #333" : "14px solid #111", transform: `scale(${zoom * autoFitScale})`, transformOrigin: "center" }}>
          <Box sx={{ height: 42, bgcolor: "#fafafa", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", px: 2, fontWeight: 600, fontSize: 13 }}>
            User / Organization Name
          </Box>

          <iframe title="Email Preview" srcDoc={emailHTML} style={{ width: "100%", height: "100%", border: "none", overscrollBehavior: "none" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;