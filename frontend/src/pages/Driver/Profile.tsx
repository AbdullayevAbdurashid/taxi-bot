import useDriver from "../../hooks/useDriver";
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import Auth from "../../utils/hoc/Auth";
import { useQuery } from "@tanstack/react-query";
import { fetchDriverOrders } from "../../api/driverService";
import Layout from "../../components/Layout";
import Orders from "../../components/Data/OrdersTable";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
const fetchOrders = async (token: string | null) => {
  if (!token) throw new Error("No access token found");
  return await fetchDriverOrders(token);
};

function Profile() {
  const { user, loading } = useDriver();
  const placeholderImage = "https://via.placeholder.com/100";

  // Fetch token from session storage
  const token = localStorage.getItem("accessToken");

  // Use React Query to fetch driver orders
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["driverOrders", token],
    queryFn: () => fetchOrders(token),
    enabled: !!token, // Only run the query if token is available
  });

  if (loading) {
    return <LoadingOverlay />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Layout>
      <VStack spacing={4} alignItems="flex-start">
        <HStack w="full">
          <Image
            borderRadius="md"
            boxSize="100px"
            src={user.passport_photo || placeholderImage}
            fallbackSrc={placeholderImage}
            alt={`${user.first_name} ${user.last_name}`}
          />

          <VStack align="flex-start" spacing={1}>
            <Text fontSize="md" fontWeight="bold">
              {user.first_name} {user.last_name}
              <Badge colorScheme={user.is_active ? "green" : "red"}>
                {user.is_active ? "Active" : "Inactive"}
              </Badge>
            </Text>
            <Text fontSize="md" color="gray.600">
              {user.phone_number}
            </Text>
            <Text fontSize="lg" color="teal.500" fontWeight="bold">
              Xisob: {user.balance} UZS
            </Text>
          </VStack>
        </HStack>
        <Box w="full">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Xaydovchilik guvoxnomangiz
          </Text>
          <Image
            borderRadius="md"
            src={user.prava_photo}
            fallbackSrc={placeholderImage}
            alt="user License"
            aspectRatio={16 / 9}
            w="full"
          />
        </Box>
        {/* Use orders data here if needed */}
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Buyurtmalar
        </Text>
        <Orders orders={orders} />
      </VStack>
    </Layout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default Auth(Profile);
