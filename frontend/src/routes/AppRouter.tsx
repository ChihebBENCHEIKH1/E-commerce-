import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register/bikerXpert" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
