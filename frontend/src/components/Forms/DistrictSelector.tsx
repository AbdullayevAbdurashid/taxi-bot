import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const DistrictSelector = ({ label, name, value, districts, onChange }) => (
  <FormControl id={name} mb={4}>
    <FormLabel>{label}:</FormLabel>
    <Select name={name} value={value} onChange={onChange}>
      <option value="">Tumanni tanlang</option>
      {districts.map((district, index) => (
        <option key={index} value={district.toLowerCase()}>
          {district.toUpperCase()}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default DistrictSelector;
