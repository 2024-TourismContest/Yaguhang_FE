import { Navigate, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/detail/DetailPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/mapPage";
import SignupPage from "./pages/signup/SignupPage";
import StadiumPage from "./pages/stadium/stadiumPage";

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
          <Route
            path="/category/:category/:selectedTeam"
            element={<MapPage />}
          />
          <Route path="*" element={<Navigate replace to="/" />} />{" "}
          <Route
            path="/details/:category/:contentId"
            element={<DetailPage />}
          />
          {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
        </>
      ) : (
        <>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </>
      )}
    </Routes>
  );
}
