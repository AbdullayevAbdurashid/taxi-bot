import { Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

const PersonalInfoStep = ({ control, errors }) => (
  <Box>
    <Controller
      name="phone_number"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.phone_number}>
          <FormLabel>Telefon raqam:</FormLabel>
          <Input {...field} type="tel" placeholder="+998" />
          <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.gender}>
          <FormLabel>Jins:</FormLabel>
          <Select {...field}>
            <option value="">Tanlang</option>
            <option value="Erkak">Erkak</option>
            <option value="Ayol">Ayol</option>
          </Select>
          <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  </Box>
);

export default PersonalInfoStep;
