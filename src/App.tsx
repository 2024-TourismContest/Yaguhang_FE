import "./App.css";
import Router from "./Router";
import Layout from "./components/layout/Layout";

function App() {
  return <Router isAuthenticated={true} />;
}

export default App;
