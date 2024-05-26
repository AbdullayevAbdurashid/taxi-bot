import React from "react";
import { useForm } from "react-hook-form";

import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
const RegistrationForm = ({ submit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <>
      <Heading
        w="100%"
        size={"lg"}
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
      >
        Foydalanuvchi registratsiyasi
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <Flex>
          <FormControl _invalid={errors.name} mr="5%">
            <FormLabel htmlFor="first_name" fontWeight={"normal"}>
              Ismingiz
            </FormLabel>
            <Input
              required
              id="first_name"
              {...register("first_name", {})}
              placeholder=""
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last_name" fontWeight={"normal"}>
              Familiyangiz
            </FormLabel>
            <Input
              required
              {...register("last_name", {
                required: "This is required",
              })}
              id="last_name"
              placeholder="First name"
            />
          </FormControl>
        </Flex>
        <FormControl mt="2%">
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            Telefon raqamingiz
          </FormLabel>
          <InputGroup>
            <InputLeftAddon>+998</InputLeftAddon>
            <Input
              required
              {...register("phone", {
                required: "This is required",
              })}
              id="phone"
              type="phone"
            />
          </InputGroup>
        </FormControl>

        <Flex w="100%" justifyContent="center">
          <Button
            isLoading={isSubmitting}
            w="7rem"
            colorScheme="blue"
            variant={"outline"}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};
export default React.memo(RegistrationForm);
