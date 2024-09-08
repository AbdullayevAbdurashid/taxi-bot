import { useForm, Controller } from "react-hook-form";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";

const PassengersAndCostStep = ({ control, errors }) => (
  <Box>
    <Controller
      name="yolovchiSoni"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.yolovchiSoni}>
          <FormLabel>Yo'lovchilar soni:</FormLabel>
          <Input {...field} type="number" />
          <FormErrorMessage>{errors.yolovchiSoni?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
    <Controller
      name="cost"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.cost}>
          <FormLabel>Narx:</FormLabel>
          <InputGroup>
            <Input {...field} type="number" />
            <InputRightAddon children="UZS" />
          </InputGroup>
          <FormErrorMessage>{errors.cost?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  </Box>
);

export default PassengersAndCostStep;
