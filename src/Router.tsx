import { Navigate, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/detail/DetailPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/mapPage";
import { RecommendPage } from "./pages/recommend/RecommendPage";
import SignupPage from "./pages/signup/SignupPage";
import StadiumPage from "./pages/stadium/stadiumPage";
import MyPageLayout from "./pages/myPage/MyPageLayout";
import MyStamp from "./pages/myPage/MyStamp";
import MyReview from "./pages/myPage/MyReview";
import MyBookMark from "./pages/myPage/MyBookMark";
import MyRecommend from "./pages/myPage/MyRecommend";
import MyPageMain from "./pages/myPage/MyPageMain";
import MyAccount from "./pages/myPage/MyAccount";
import MycoursePage from "./pages/mycourse/MycoursePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stadium" element={<StadiumPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/category/:category/:selectedTeam" element={<MapPage />} />
      <Route path="/details/:category/:contentId" element={<DetailPage />} />
      <Route path="/mypage" element={<MyPageLayout />}>
        <Route index element={<MyPageMain />} />
        <Route path="stamp" element={<MyStamp />} />
        <Route path="bookmark" element={<MyBookMark />} />
        <Route path="recommend" element={<MyRecommend />} />
        <Route path="review" element={<MyReview />} />
        <Route path="account" element={<MyAccount />} />
      </Route>
      <Route path="/region" element={<RecommendPage />} />
      <Route path="/mycourse" element={<MycoursePage />} />
    </Routes>
  );
}
