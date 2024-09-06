import "./App.css";
import Router from "./Router";
import Layout from "./components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAuthStore from "./store/authStore";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      <Router isAuthenticated={isAuthenticated}/>
    </Layout>
  );
}

export default App;