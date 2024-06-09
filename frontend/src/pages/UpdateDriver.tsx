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
  chakra,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const UpdateDriver = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(false);
  const [location, setLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState("");
  const driver = JSON.parse(sessionStorage.getItem("driver"));
  const toast = useToast();
  React.useEffect(() => {
    if (!driver) {
      navigate("/driver");
    }
  }, [driver]);
  console.log(available);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverId = sessionStorage.getItem("driver")
      ? JSON.parse(sessionStorage.getItem("driver")).id
      : null;
    if (!driverId) {
      setMessage("No driver logged in.");
      return;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_ENDPOINT}/api/drivers/update/${driverId}`,
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
          Salom,
          <chakra.span color="green.300">
            {driver?.name || "driver"}
          </chakra.span>
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="available" mb="0">
              Yo'lovchi olishga tayyorman
            </FormLabel>
            <Switch
              id="available"
              isChecked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </FormControl>
          <FormControl id="location" mb={4}>
            <FormLabel>Jo'ylashuv</FormLabel>

            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value={"Toshkent"}>Toshkent</option>
              <option value={"Fargona"}>Fargona</option>
              <option value={"Bog'dod"}>Bog'dod</option>
              <option value={"Bogdod, Rishton, Buvayda"}>
                Bogdod, Rishton, Buvayda
              </option>
              <option value={"Yaypan"}>Yaypan</option>
            </Select>
          </FormControl>
          <FormControl id="passengers" mb={4}>
            <FormLabel>Yolovchilar soni</FormLabel>
            <Select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            >
              <option value={1}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Yangilash
          </Button>
        </form>
        {message && <Text mt={4}>{message}</Text>}
      </Box>
    </Container>
  );
};
