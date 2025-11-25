import { Box } from "@mui/material";
import React from "react";
import BoxComponent from "../../components/uiComponents/BoxComponent";

const Layouts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
        scrollbarWidth: "thin",
        boxSizing: "border-box",
      }}
    >
      <BoxComponent colCount={1} />
      <BoxComponent colCount={2} />
      <BoxComponent colCount={3} />
      <BoxComponent colCount={4} />
      <BoxComponent colCount={5} />
      <BoxComponent colCount={6} />
      <BoxComponent colCount={7} />
      <BoxComponent colCount={8} />
      <BoxComponent colCount={9} />
      <BoxComponent colCount={10} />
    </Box>
  );
};

export default Layouts;
