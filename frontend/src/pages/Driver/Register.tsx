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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/driverValidation";
const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", data.firstName);
    formDataToSend.append("last_name", data.lastName);
    formDataToSend.append("phone_number", data.phoneNumber);
    formDataToSend.append("passport_photo", data.passportImage[0]);
    formDataToSend.append("prava_photo", data.licenseImage[0]);

    try {
      const response = await registerNewDriver(formDataToSend); // API call
      console.log(response);
      if (response) {
        toast({
          title: "Sorov yuborildi!",
          description:
            "Bizning operatorlar sizning sorovingizni tez orada ko'rib chiqadi va telefoningizga parol yuboradi.",
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
    <Layout isHeader={false} isBottom={false} centerContent>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            id="firstName"
            mb={4}
            isInvalid={errors.firstName ? true : false}
          >
            <FormLabel>Ismingiz</FormLabel>
            <Input name="firstName" type="text" {...register("firstName")} />
            {errors.firstName && (
              <Text color="red.500">{errors.firstName.message}</Text>
            )}
          </FormControl>
          <FormControl
            id="lastName"
            mb={4}
            isInvalid={errors.lastName ? true : false}
          >
            <FormLabel>Familiyangiz</FormLabel>
            <Input name="lastName" type="text" {...register("lastName")} />
            {errors.lastName && (
              <Text color="red.500">{errors.lastName.message}</Text>
            )}
          </FormControl>
          <FormControl
            id="phoneNumber"
            mb={4}
            isInvalid={errors.phoneNumber ? true : false}
          >
            <FormLabel>Telefon Raqamingiz</FormLabel>
            <InputGroup>
              <Input
                placeholder="+998"
                name="phoneNumber"
                type="tel"
                {...register("phoneNumber")}
              />
            </InputGroup>
            {errors.phoneNumber && (
              <Text color="red.500">{errors.phoneNumber.message}</Text>
            )}
          </FormControl>
          <FormControl
            id="passportImage"
            mb={4}
            isInvalid={errors.passportImage ? true : false}
          >
            <FormLabel>Passportingizni yuklang</FormLabel>
            <Input
              name="passportImage"
              type="file"
              accept="image/*"
              {...register("passportImage")}
            />
            {errors.passportImage && (
              <Text color="red.500">{errors.passportImage.message}</Text>
            )}
          </FormControl>
          <FormControl
            id="licenseImage"
            mb={4}
            isInvalid={errors.licenseImage ? true : false}
          >
            <FormLabel>Haydovchilik guvohnomasini yuklang</FormLabel>
            <Input
              name="licenseImage"
              type="file"
              accept="image/*"
              {...register("licenseImage")}
            />
            {errors.licenseImage && (
              <Text color="red.500">{errors.licenseImage.message}</Text>
            )}
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
