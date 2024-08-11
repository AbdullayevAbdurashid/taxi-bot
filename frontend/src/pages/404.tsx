import { Box, Button, Heading, Text, Center, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      p={4}
    >
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="xl" color="red.500">
          404
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Adashib qoldingizmi?!
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => navigate("/driver/dashboard")}
          size="lg"
          borderRadius="md"
        >
          Bosh sahifaga qaytish
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
