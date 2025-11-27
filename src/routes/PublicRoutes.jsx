import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Preview from "../pages/Preview";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
};

export default PublicRoutes;
