import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingOverlay from "./components/Common/LoadingOverlay";
// Lazy load components
const DriverLogin = lazy(() => import("./pages/Driver/DriverLogin"));
const DriverDashboard = lazy(() => import("./pages/Driver/DriverDashboard"));
const Register = lazy(() => import("./pages/Driver/Register"));
const SearchPage = lazy(() => import("./pages/Driver/GetUser"));
const TransportForm = lazy(() => import("./pages/Driver/SendUser"));
const NotFoundPage = lazy(() => import("./pages/404"));
const Profile = lazy(() => import("./pages/Driver/Profile"));
const GetParcel = lazy(() => import("./pages/Driver/GetParcel"));
const DriverOrders = lazy(() => import("./pages/Driver/DriverOrders"));

const routes = [
  { path: "/", element: <DriverDashboard /> },
  { path: "/driver/login", element: <DriverLogin /> },
  { path: "/driver/register", element: <Register /> },
  { path: "/driver/user/add", element: <TransportForm isPost={false} /> },
  { path: "/driver/user/get", element: <SearchPage /> },
  { path: "/driver/parcel/get", element: <GetParcel /> },
  { path: "/driver/parcel/add", element: <TransportForm isPost={true} /> },
  { path: "/driver/orders", element: <DriverOrders /> },
  { path: "/404", element: <NotFoundPage /> },
  { path: "/driver/dashboard", element: <DriverDashboard /> },
  { path: "/driver", element: <DriverDashboard /> },
  { path: "/driver/profile", element: <Profile /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
