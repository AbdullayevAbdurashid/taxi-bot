import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@chakra-ui/react";

import useApi from "./hooks/useSupabase";
import Wizard from "./pages/MakeOrder";
import OrderSuccessPage from "./pages/OrderSuccess";
import VerifyDriver from "./pages/VerifyDriver";
import { UpdateDriver } from "./pages/UpdateDriver";
import AdminPage from "./pages/admin/AdminPage";
import Sidebar from "./pages/admin/AdminSidebar";
import AllDrivers from "./pages/admin/AllDrivers";
import OrdersList from "./pages/admin/AllOrders";
const App = () => {
  const { loading } = useApi();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log(import.meta.env.VITE_API_ENDPOINT); // "123"

  return (
    <Router>
      <Container maxW={{ base: "sm", md: "100%" }}>
        <Routes>
          <Route path="/" element={<Wizard />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/driver" element={<VerifyDriver />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/driver/update" element={<UpdateDriver />} />
          <Route
            path="/admin/login"
            element={
              <>
                <AdminPage />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <AdminPage />
              </>
            }
          />
          <Route
            path="/admin/drivers"
            element={
              <>
                <Sidebar>
                  <AllDrivers />
                </Sidebar>
              </>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <>
                <Sidebar>
                  <OrdersList />
                </Sidebar>
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
