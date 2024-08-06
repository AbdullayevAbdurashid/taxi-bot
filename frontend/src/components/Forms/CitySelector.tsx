// CitySelector.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { toshkentDistricts } from "../../db/options";

const CitySelector = ({
  whereOptions,
  whereToOptions,
  onSearch,
  isLoading,
}) => {
  const { control, handleSubmit, watch } = useForm();
  const where = watch("where");
  const whereTo = watch("whereTo");

  return (
    <Box>
      <form onSubmit={handleSubmit(onSearch)}>
        <FormControl id="where" mb={4}>
          <FormLabel>Qayerdan:</FormLabel>
          <Controller
            name="where"
            control={control}
            defaultValue={whereOptions[1]}
            render={({ field }) => (
              <Select {...field}>
                {whereOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {where === "toshkent" && (
          <FormControl id="tuman" mb={4}>
            <FormLabel>Tuman:</FormLabel>
            <Controller
              name="tuman"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Tumanni tanlang</option>
                  {toshkentDistricts.map((tuman) => (
                    <option key={tuman} value={tuman}>
                      {tuman.toUpperCase()}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        )}

        <FormControl id="whereTo" mb={4}>
          <FormLabel>Qayerga:</FormLabel>
          <Controller
            name="whereTo"
            control={control}
            defaultValue={whereToOptions[0]}
            render={({ field }) => (
              <Select {...field}>
                {whereToOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {whereTo === "toshkent" && (
          <FormControl id="tuman2" mb={4}>
            <FormLabel>Tuman:</FormLabel>
            <Controller
              name="tuman2"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Tumanni tanlang</option>
                  {toshkentDistricts.map((tuman) => (
                    <option key={tuman} value={tuman}>
                      {tuman.toUpperCase()}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        )}

        <Button type="submit" colorScheme="teal" isLoading={isLoading}>
          Qidirish
        </Button>
      </form>
    </Box>
  );
};

export default CitySelector;
