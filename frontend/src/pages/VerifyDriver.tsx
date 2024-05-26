import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  chakra,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const VerifyDriver = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/drivers/verify",
        {
          phoneNumber,
          password,
        }
      );
      const { id, name, phoneNumber: driverPhoneNumber } = response.data;

      // Store driver information in localStorage
      localStorage.setItem(
        "driver",
        JSON.stringify({ id, name, phoneNumber: driverPhoneNumber })
      );

      toast({
        title: `Xush kelibsiz, ${name}`,
        status: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Error verifying driver",
        status: "success",
        duration: 1000,
      });
    }
  };

  return (
    <Container centerContent pt={20}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="md" mb={4}>
          <chakra.span color="green.300"> Assalomu alaykum,</chakra.span> sizni
          qayta korganimizdan hursandmiz!
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
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
