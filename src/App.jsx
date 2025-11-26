import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
}

export default App;
