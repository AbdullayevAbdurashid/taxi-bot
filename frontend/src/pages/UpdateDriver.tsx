import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  Container,
  Heading,
  useToast,
} from "@chakra-ui/react";

export const UpdateDriver = () => {
  const [available, setAvailable] = useState(false);
  const [location, setLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverId = localStorage.getItem("driver")
      ? JSON.parse(localStorage.getItem("driver")).id
      : null;
    if (!driverId) {
      setMessage("No driver logged in.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/drivers/update/${driverId}`,
        {
          available,
          location,
          passengers,
        }
      );
      setMessage(`Driver updated successfully`);
      toast({
        title: "Success",
        description: "Driver details updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating driver");
      toast({
        title: "Error",
        description: "An error occurred while updating driver details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h1" size="lg" mb={4}>
          Update Driver
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="available" mb="0">
              Available
            </FormLabel>
            <Switch
              id="available"
              isChecked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </FormControl>
          <FormControl id="location" mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl id="passengers" mb={4}>
            <FormLabel>Number of Passengers</FormLabel>
            <Select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Update
          </Button>
        </form>
        {message && <Text mt={4}>{message}</Text>}
      </Box>
    </Container>
  );
};
