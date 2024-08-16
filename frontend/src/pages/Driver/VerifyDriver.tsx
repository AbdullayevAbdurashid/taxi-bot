// src/components/VerifyDriver.js
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  chakra,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { verifyDriver } from "../../api/driverService";
import Layout from "../../components/Layout";
const VerifyDriver = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await verifyDriver("+998" + phoneNumber, password);
      if (response.access) {
        const { access, refresh } = response;
        sessionStorage.setItem("accessToken", access);
        sessionStorage.setItem("refreshToken", refresh);
        setLoading(false);
        navigate("/driver/dashboard");
      } else {
        setLoading(false);

        toast({
          title: "Verification failed.",
          description: response.message || "Invalid phone number or password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Parol notog'ri.",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout centerContent pt={20} isHeader={false}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="md" mb={4}>
          <chakra.span color="green.300">Assalomu alaykum,</chakra.span> sizni
          qayta korganimizdan hursandmiz!
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon>+998</InputLeftAddon>
              <Input
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Text mb={4} fontWeight={"bold"}>
            {" "}
            Akkauntingiz yo'g'mi?{" "}
            <chakra.span color={"primary"}>
              <Link to={"/driver/register"}> Bu yerda oching</Link>
            </chakra.span>
          </Text>
          <Button
            isLoading={loading}
            type="submit"
            colorScheme="teal"
            width="full"
          >
            Davom etish
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default VerifyDriver;
