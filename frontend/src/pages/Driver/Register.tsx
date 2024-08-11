import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { registerNewDriver } from "../../api/driverService";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    passportImage: null,
    licenseImage: null,
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();

    // Append all formData keys to formDataObj
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("phone_number", formData.phoneNumber);
    formDataToSend.append("passport_photo", formData.passportImage);
    formDataToSend.append("prava_photo", formData.licenseImage);

    try {
      const response = await registerNewDriver(formDataToSend); // API call
      if (response) {
        toast({
          title: "Sorov yuborildi!",
          description:
            "Bizning operatorlar sizning sorovingizni tez orada korib chiqadi va telefoningizga parol yuborad",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/driver/login");
        }, 4000);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout isHeader={false} centerContent>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="md" mb={4}>
          <chakra.span>Ro'yxatdan o'tish</chakra.span>
        </Heading>
        <Text mb={4} fontWeight={"bold"}>
          Akkauntingiz bormi?{" "}
          <chakra.span color={"primary"}>
            <Link to={"/driver/login"}> Kirish</Link>
          </chakra.span>
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="firstName" mb={4}>
            <FormLabel>Ismingiz</FormLabel>
            <Input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="lastName" mb={4}>
            <FormLabel>Familiyangiz</FormLabel>
            <Input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Telefon Raqamingiz</FormLabel>
            <InputGroup>
              <Input
                placeholder="+998"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="passportImage" mb={4}>
            <FormLabel>Passportingizni yuklang</FormLabel>
            <Input
              name="passportImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="licenseImage" mb={4}>
            <FormLabel>Haydovchilik guvoxnomasini yuklang</FormLabel>
            <Input
              name="licenseImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </FormControl>
          <Button
            isLoading={loading}
            type="submit"
            colorScheme="teal"
            width="full"
          >
            Ro'yxatdan o'tish
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default RegisterForm;
