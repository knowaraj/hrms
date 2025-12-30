import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/sign-in";
import Dashboard from "./pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
