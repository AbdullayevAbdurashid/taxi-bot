import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Text,
  useToast,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
const LocationStep = ({
  control,
  regions,
  filteredFromDistricts,
  filteredToDistricts,
  setValue,
  errors,
}) => (
  <Box>
    <Controller
      name="where"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.where}>
          <FormLabel>Qayerdan (viloyat):</FormLabel>
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              setValue("where", e.target.value);
            }}
          >
            <option value="">Viloyatni tanlang</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name_uz.toUpperCase()}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.where?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
    <Controller
      name="tuman"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.tuman}>
          <FormLabel>Qayerdan (tuman):</FormLabel>
          <Select {...field}>
            <option value="">Tumanni tanlang</option>
            {filteredFromDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name_uz.toUpperCase()}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.tuman?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
    <Controller
      name="to"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.to}>
          <FormLabel>Qayerga (viloyat):</FormLabel>
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              setValue("to", e.target.value);
            }}
          >
            <option value="">Viloyatni tanlang</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name_uz.toUpperCase()}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
    <Controller
      name="to_tuman"
      control={control}
      render={({ field }) => (
        <FormControl mb="4" isInvalid={errors.to_tuman}>
          <FormLabel>Qayerga (tuman):</FormLabel>
          <Select {...field}>
            <option value="">Tumanni tanlang</option>
            {filteredToDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name_uz.toUpperCase()}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.to_tuman?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  </Box>
);

export default LocationStep;
