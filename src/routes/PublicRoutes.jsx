
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Layout = lazy(() => import("../components/layout/Layout"));
const Preview = lazy(() => import("../pages/Preview"));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", marginTop: "40vh", fontSize: "18px" }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;