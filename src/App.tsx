import "./App.css";
import Router from "./Router";
import Layout from "./components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modal from "./components/common/Modal";
import useModalStore from "./store/modalStore";

const App: React.FC = () => {
  const { isOpen, config, closeModal } = useModalStore();

  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      <Router />
      {isOpen && (
        <Modal
          title={config.title}
          content={config.content}
          onConfirm={config.onConfirm || closeModal}
          onCancel={config.onCancel || closeModal}
          showDoNotShowAgain={config.showDoNotShowAgain}
          showConfirm={config.showConfirm}
          showCancel={config.showCancel}
        />
      )}
    </Layout>
  );
};
export default App;
