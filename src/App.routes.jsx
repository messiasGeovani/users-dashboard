import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddOrEditUser from "./views/AddOrEditUser";
import Dashboard from "./views/Dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="users">
            <Route path="edit" element={<AddOrEditUser />} />
            <Route path="new" element={<AddOrEditUser />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
