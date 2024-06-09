import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  Text,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import useApi from "../hooks/useSupabase"; // Assuming useApi is where the API calls are defined
import useTelegram from "../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
const routes = [
  "Fergana - Fargʻonadan - Toshkentga,",
  "Toshkentdan - Fargʻonaga",
  "Bogʻdod, Rishton, Buvaydadan - Toshkentga",
  "Bogʻdod, Rishton, Buvaydadan - Toshkentga",
  "Toshkentdan - Bogʻdod, Rishton, Buvaydaga",
  "Yaypandan - Toshkentga",
  "Toshkentdan - Yaypanga",
];

const OrderForm = () => {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const [formData, setFormData] = useState({
    tg_id: "",
    routes: "",
    offeredMoney: "",
    numberOfPeople: "",
    type: "taxi",
    rideDate: "",
    rideTime: "",
    phone: "",
  });

  const { createOrder, loading } = useApi(); // Assuming createOrder is a function in useApi hook

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tg_id: JSON.stringify(user.id),
      }));
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (valueString, name) => {
    setFormData({ ...formData, [name]: valueString });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const response = await createOrder(formData);
      if (response) {
        setFormData({
          tg_id: JSON.stringify(user.id),
          routes: "",
          offeredMoney: "",
          numberOfPeople: "",
          type: "",
          rideDate: "",
          rideTime: "",
          phone: "",
        });
        // Redirect to success page
        navigate("/order-success");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Failed to create order");
      }
    } else {
      console.error("User not defined");
    }
  };

  if (!user) {
    return (
      <Box maxW="sm" mx="auto" p={4} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading user data...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="sm" mx="auto" p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="routes" isRequired>
          <FormLabel>Yo'nalish</FormLabel>
          <Select name="routes" value={formData.routes} onChange={handleChange}>
            <option value="">Select route</option>
            {routes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="offeredMoney" isRequired>
          <FormLabel>Taklif qilingan summa</FormLabel>
          <NumberInput
            value={formData.offeredMoney}
            color={"white"}
            onChange={(valueString) =>
              handleNumberInputChange(valueString, "offeredMoney")
            }
          >
            <NumberInputField name="offeredMoney" />
          </NumberInput>
          {/* <InputRightAddon>000</InputRightAddon> */}
        </FormControl>

        <FormControl id="numberOfPeople" isRequired>
          <FormLabel>Yo'lovchilar soni</FormLabel>
          <NumberInput
            min={1}
            max={4}
            value={formData.numberOfPeople}
            onChange={(valueString) =>
              handleNumberInputChange(valueString, "numberOfPeople")
            }
          >
            <NumberInputField min={1} max={4} name="numberOfPeople" />
          </NumberInput>
        </FormControl>

        <FormControl id="type" isRequired>
          <FormLabel>Zakaz turi</FormLabel>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <option value="taxi">Taxi</option>
            <option value="pochta">Pochta</option>
          </Select>
        </FormControl>
        <FormControl id="phone" isRequired>
          <FormLabel>Telefoningizni kiriting </FormLabel>
          <Input type="text" name="phone" onChange={handleChange} />
        </FormControl>
        <FormControl id="rideDate" isRequired>
          <FormLabel>San'ani tanlang</FormLabel>
          <Input
            type="date"
            name="rideDate"
            value={formData.rideDate}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 10)} // set min date to today
            max={new Date(Date.now() + 86400000).toISOString().slice(0, 10)} // set max date to tomorrow
          />
        </FormControl>
        <FormControl id="rideTime" isRequired>
          <FormLabel> vaqtni tanlang</FormLabel>
          <Select
            name="rideTime"
            value={formData.rideTime}
            onChange={handleChange}
          >
            {[...Array(24).keys()].map((hour) => (
              <option
                key={hour}
                value={`${hour.toString().padStart(2, "0")}:00`}
              >
                {`${hour.toString().padStart(2, "0")}:00`}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="green" isLoading={loading} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;
