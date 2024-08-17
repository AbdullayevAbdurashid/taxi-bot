/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Heading,
  SimpleGrid,
  chakra,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { categories } from "../../db/driverCategories";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import useDriver from "../../hooks/useDriver";
import Layout from "../../components/Layout";
import Auth from "../../utils/hoc/Auth";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
const DriverDashboard = () => {
  const { user, loading } = useDriver();
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();
  if (loading) {
    return <LoadingOverlay />;
  }

  if (!user) {
    return "Iltimos dasturga qaytadan kring";
  }
  return (
    <Layout centerContent minHeight="100vh" py={{ base: 5, md: 0 }}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        w="full"
        textAlign="left"
      >
        <Heading as="h2" width={"100%"} size="md" mb={4} color={textColor}>
          Salom {""}
          <chakra.span color="green.400">
            {user?.first_name + " " + user?.last_name || "Driver"}
          </chakra.span>
        </Heading>
        <Text fontSize="lg" mb={4} color={textColor}>
          Hisobingiz:
          <chakra.span fontWeight={"bold"} color="green.500">
            <CurrencyFormat
              value={user?.balance}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" so'm"}
            />
          </chakra.span>
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
          {categories.map((category, indx) => (
            <Box
              key={indx}
              as="button"
              onClick={() => {
                navigate(category.url);
              }}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg={category.bgColor}
              color={textColor}
              display="flex"
              justifyContent={"center"}
              gap={4}
              px={4}
              _hover={{
                bg: useColorModeValue(
                  category.hoverBgColor,
                  `${category.hoverBgColor.split(".")[0]}.600`
                ),
              }}
            >
              <category.icon size="30px" />
              <Heading size="sm" mt={2}>
                {category.name}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default Auth(DriverDashboard);
