import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import useApi from "./hooks/useSupabase";
import Wizard from "./pages/MakeOrder";

import OrderSuccessPage from "./pages/OrderSuccess";
import VerifyDriver from "./pages/Driver/VerifyDriver";
import DriverDashboard from "./pages/Driver/DriverDashboard";
import Register from "./pages/Driver/Register";
import SearchPage from "./pages/Driver/GetUser";
import TransportForm from "./pages/Driver/SendUser";
const App = () => {
  const { loading } = useApi();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Routes>
        {/* Should make routes in array its bad code r.n */}
        <Route path="/" element={<Wizard />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/driver/login" element={<VerifyDriver />} />
        <Route path="/driver/register" element={<Register />} />
        <Route path="/driver/user/add" element={<TransportForm />} />
        <Route path="/driver/user/get" element={<SearchPage />} />

        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
