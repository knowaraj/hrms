import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/sign-in";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRoutes;
