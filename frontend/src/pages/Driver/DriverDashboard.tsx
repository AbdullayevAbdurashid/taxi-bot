/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  chakra,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { categories } from "../../db/driverCategories";
import CurrencyFormat from "react-currency-format";

const driver = {
  name: "Islombek Raxmonberdiev",
  balance: "1272500",
};

const DriverDashboard = () => {
  const textColor = useColorModeValue("black", "white");

  return (
    <Container
      maxW={{ base: "100%", md: "xl" }}
      centerContent
      minHeight="100vh"
      py={{ base: 2, md: 10 }}
    >
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
            {driver?.name || "Driver"}
          </chakra.span>
        </Heading>
        <Text fontSize="lg" mb={4} color={textColor}>
          Balance:
          <chakra.span fontWeight={"bold"} color="green.500">
            <CurrencyFormat
              value={driver?.balance}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" uzs"}
            />
          </chakra.span>
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
          {categories.map((category, indx) => (
            <Box
              key={indx}
              as="button"
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
    </Container>
  );
};

export default DriverDashboard;
