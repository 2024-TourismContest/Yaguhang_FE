import { Navigate, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/detail/DetailPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/mapPage";
import { RecommendPage } from "./pages/recommend/RecommendPage";
import SignupPage from "./pages/signup/SignupPage";
import StadiumPage from "./pages/stadium/stadiumPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stadium" element={<StadiumPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/category/:category/:selectedTeam" element={<MapPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/details/:category/:contentId" element={<DetailPage />} />
      <Route path="/recommentPage" element={<RecommendPage />} />
    </Routes>
  );
}
