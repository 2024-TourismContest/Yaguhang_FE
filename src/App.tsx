import "./App.css";
import Router from "./Router";
import Layout from "./components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      <Router isAuthenticated={true} />
    </Layout>
  );
}

export default App;
