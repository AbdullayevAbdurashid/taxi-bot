// TransportForm.js
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import {
  originalWhereOptions,
  originalWhereToOptions,
  toshkentDistricts,
} from "../../db/options";
import Layout from "../../components/Layout";
import { sendNewUser } from "../../api/driverService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransportForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    const token = sessionStorage.getItem("accessToken");
    const response = await sendNewUser(data, token);
    if (response) {
      toast({
        title: "Yolovchi  yuborildi!.",
        description: "So'rovingiz tez orada korib chiqiladi.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/driver/dashboard");
      }, 2100);
    }
  };
  const { register, handleSubmit, watch, setValue } = useForm();
  const where = watch("where");
  const to = watch("to");

  const handleChangeWhere = (e) => {
    setValue("where", e.target.value);
  };

  const handleChangeWhereTo = (e) => {
    setValue("to", e.target.value);
  };

  return (
    <Layout>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="where" mb={4}>
            <FormLabel>Qayerdan:</FormLabel>
            <Select {...register("where")} onChange={handleChangeWhere}>
              {originalWhereOptions.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </Select>
          </FormControl>

          {where === "toshkent" && (
            <FormControl id="tuman" mb={4}>
              <FormLabel>Tuman:</FormLabel>
              <Select {...register("tuman")}>
                <option value="">Tumanni tanlang</option>
                {toshkentDistricts.map((tuman) => (
                  <option key={tuman} value={tuman}>
                    {tuman.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl id="to" mb={4}>
            <FormLabel>Qayerga:</FormLabel>
            <Select {...register("to")} onChange={handleChangeWhereTo}>
              {originalWhereToOptions.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </Select>
          </FormControl>

          {to === "toshkent" && (
            <FormControl id="tuman2" mb={4}>
              <FormLabel>Tuman:</FormLabel>
              <Select {...register("tuman2")}>
                <option value="">Tumanni tanlang</option>
                {toshkentDistricts.map((tuman) => (
                  <option key={tuman} value={tuman}>
                    {tuman.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl id="phone_number" mb={4}>
            <FormLabel>Telefon Raqam:</FormLabel>
            <Input {...register("phone_number")} type="tel" required />
          </FormControl>

          <FormControl id="yolovchiSoni" mb={4}>
            <FormLabel>Yo'lovchilar soni:</FormLabel>
            <Input {...register("yolovchiSoni")} type="number" />
          </FormControl>

          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="teal"
            width="full"
          >
            Yuborish
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default TransportForm;
