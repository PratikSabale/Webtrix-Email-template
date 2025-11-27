import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default PublicRoutes;
