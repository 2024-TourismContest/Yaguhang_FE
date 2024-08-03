import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";

function App() {
  return (
  <Layout>
    <Router isAuthenticated={true}/>
  </Layout>
  )
}

export default App;
