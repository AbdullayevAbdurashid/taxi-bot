import {
  Box,
  Heading,
  SimpleGrid,
  chakra,
  useColorModeValue,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { categories } from "../../db/driverCategories";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import useDriver from "../../hooks/useDriver";
import Layout from "../../components/Layout";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
import CategoryButton from "../../components/Common/CategoryButton";
import Auth from "../../utils/hoc/Auth";
const DriverDashboard = () => {
  const { user, loading } = useDriver();
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const navigate = useNavigate();

  if (loading) return <LoadingOverlay />;
  return (
    <Layout centerContent minHeight="100vh">
      <Box
        py={4}
        px={4}
        shadow="lg"
        borderWidth="1px"
        borderRadius="md"
        w="full"
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" wrap="wrap">
            <Heading as="h2" size="md" color={textColor}>
              Salom,{" "}
              <chakra.span color="primary">
                {user?.first_name} {user?.last_name || "Driver"}
              </chakra.span>
            </Heading>
            <Text fontSize="xl" fontWeight="medium" color={textColor}>
              Hisobingiz:{" "}
              <chakra.span fontWeight="bold" color="telegram.900">
                <CurrencyFormat
                  value={user?.balance}
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" so'm"
                />
              </chakra.span>
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                category={category}
                onClick={() => navigate(category.url)}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Auth(DriverDashboard);
