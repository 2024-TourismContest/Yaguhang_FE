import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import StadiumPage from "./pages/stadium/stadiumPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import DetailPage from "./pages/detail/DetailPage";

export default function Router() {
  return (
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stadium" element={<StadiumPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/details/:category/:contentId"
            element={<DetailPage />}
          />
        </>
    </Routes>
  );
}
