// src/components/VerifyDriver.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  chakra,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { verifyDriver } from "../../api/driverService";

const VerifyDriver = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    const driver = JSON.parse(sessionStorage.getItem("driver"));
    if (driver) {
      navigate("/driver/update");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyDriver(phoneNumber, password);

      if (response.token) {
        sessionStorage.setItem("driver", JSON.stringify(response.driver));
        sessionStorage.setItem("token", response.token); // Save JWT
        navigate("/driver/update");
      } else {
        toast({
          title: "Verification failed.",
          description: response.message || "Invalid phone number or password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent pt={20}>
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
          <Button type="submit" colorScheme="teal" width="full">
            Verify
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VerifyDriver;
