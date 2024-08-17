import OrdersTable from "../../components/Data/OrdersTable";
import Layout from "../../components/Layout";
import { fetchDriverOrders } from "../../api/driverService";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../../components/Common/LoadingOverlay";

function DriverOrders() {
  const token = localStorage.getItem("accessToken");
  const fetchOrders = async (token: string | null) => {
    if (!token) throw new Error("No access token found");
    return await fetchDriverOrders(token);
  };
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["driverOrders", token],
    queryFn: () => fetchOrders(token),
    enabled: !!token, // Only run the query if token is available
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Layout>
      <OrdersTable orders={orders} />
    </Layout>
  );
}

export default DriverOrders;
