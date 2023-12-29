import UsageSummary from "./Components/UsageSummary/UsageSummary";
import Login from "./Components/Login/Login";
import Layout from "./Components/Common/Layout";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
      <Layout>{isLoggedIn ? <UsageSummary /> : <Login />}</Layout>
  );
};

export default App;
