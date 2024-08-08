import "./App.css";
import Router from "./Router";
import Layout from "./components/layout/Layout";

function App() {
  return (
  <Layout>
    <Router isAuthenticated={true}/>
  </Layout>
  )
}

export default App;
