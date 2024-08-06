import React, { useState } from "react";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  chakra,
} from "@chakra-ui/react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    passportImage: null,
    licenseImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Container centerContent pt={20}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="md" mb={4}>
          <chakra.span color="green.300">Ro'yxatdan o'tish</chakra.span>
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="firstName" mb={4}>
            <FormLabel>Ism</FormLabel>
            <Input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="lastName" mb={4}>
            <FormLabel>Familya</FormLabel>
            <Input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Telefon Raqam</FormLabel>
            <InputGroup>
              <InputLeftAddon>+998</InputLeftAddon>
              <Input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="passportImage" mb={4}>
            <FormLabel>Passport Rasm</FormLabel>
            <Input
              name="passportImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="licenseImage" mb={4}>
            <FormLabel>Prava Rasm</FormLabel>
            <Input
              name="licenseImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Ro'yxatdan o'tish
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
