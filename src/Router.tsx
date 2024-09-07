import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import StadiumPage from "./pages/stadium/stadiumPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

interface RouterProps {
  isAuthenticated: boolean;
}
export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/stadium" element={<StadiumPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
}
