import { RecoilRoot } from "recoil";
import "./App.css";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <RecoilRoot>
      <Layout></Layout>
    </RecoilRoot>
  );
}

export default App;
