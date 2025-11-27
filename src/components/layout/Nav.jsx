import { Avatar, Box, IconButton } from "@mui/material";
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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "8px 16px",
      }}
    >
      {/* Left - Logo */}
      <Avatar
        src={webtrixLogo}
        variant="square"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      {/* Center - Undo / Redo */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton onClick={undo}>
          <Undo sx={{ fontSize: 28 }} />
        </IconButton>

        <IconButton onClick={redo}>
          <Redo sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* Right - Preview */}
      <IconButton onClick={() => navigate("/preview")}>
        <PreviewRounded sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default Nav;
