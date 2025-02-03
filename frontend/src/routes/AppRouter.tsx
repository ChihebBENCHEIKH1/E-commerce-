import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login/bikerXpert" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
