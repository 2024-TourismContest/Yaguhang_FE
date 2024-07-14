import { RecoilRoot } from "recoil";
import "./App.css";
import Layout from "./components/layout/Layout";
import Carousel from "./components/carousel";

function App() {
  return (
    <RecoilRoot>
      <Layout></Layout>
      <Carousel />
    </RecoilRoot>
  );
}

export default App;
