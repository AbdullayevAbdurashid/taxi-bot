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
import NotFoundPage from "./pages/404";
import Profile from "./pages/Driver/Profile";
import GetParcel from "./pages/Driver/GetParcel";
import LoadingOverlay from "./components/Common/LoadingOverlay";
const App = () => {
  const { loading } = useApi();

  if (loading) {
    return <LoadingOverlay />;
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
        <Route
          path="/driver/user/add"
          element={<TransportForm isPost={false} />}
        />
        <Route path="/driver/user/get" element={<SearchPage />} />
        <Route path="/driver/parcel/get" element={<GetParcel />} />
        <Route
          path="/driver/parcel/add"
          element={<TransportForm isPost={true} />}
        />

        <Route path="/404" element={<NotFoundPage />}></Route>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/" element={<DriverDashboard />} />
        <Route path="/driver/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
