import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import FrontPage from "./pages/FrontPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
