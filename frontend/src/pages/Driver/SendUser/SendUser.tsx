import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapPin, FaUser, FaUsers } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendUser } from "../../../utils/driverValidation";
import { Box, Button, Input, Flex, Text, useToast } from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import { sendNewUser } from "../../../api/driverService";
import { useNavigate } from "react-router-dom";
import { ADMIN_TOKEN } from "../../../db/constants";
import { getNameById } from "../../../utils/helper";
import { LocationStep, PersonalInfoStep, PassengersAndCostStep } from "./Steps";
const steps = [
  { title: "Manzil", icon: FaMapPin },
  { title: "Yo'lovchilar va Narx", icon: FaUsers },
  { title: "Shaxsiy Ma'lumot", icon: FaUser },
];

const TransportForm = ({ isPost }) => {
  const queryParams = new URLSearchParams(location.search);
  const isUser = queryParams.get("isUser") === "true";
  const storage = isUser ? sessionStorage : localStorage;
  const token = storage.getItem("accessToken");

  const [currentStep, setCurrentStep] = useState(0);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredFromDistricts, setFilteredFromDistricts] = useState([]);
  const [filteredToDistricts, setFilteredToDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendUser),
  });

  const where = watch("where");
  const to = watch("to");

  useEffect(() => {
    const tokenKey = isUser ? "accessToken" : "accessToken";
    const storage = isUser ? sessionStorage : localStorage;

    if (isUser) {
      storage.setItem(tokenKey, ADMIN_TOKEN);
    }

    return () => {
      if (isUser) {
        storage.removeItem(tokenKey);
      }
    };
  }, [isUser]);

  useEffect(() => {
    const fetchRegionsAndDistricts = async () => {
      const regionsResponse = await fetch("/regions.json");
      const regionsData = await regionsResponse.json();
      setRegions(regionsData);

      const districtsResponse = await fetch("/districts.json");
      const districtsData = await districtsResponse.json();
      setDistricts(districtsData);
    };

    fetchRegionsAndDistricts();
  }, []);

  useEffect(() => {
    const fromDistricts = districts.filter(
      (district) => district.region_id === where
    );
    setFilteredFromDistricts(fromDistricts);

    const toDistricts = districts.filter(
      (district) => district.region_id === to
    );
    setFilteredToDistricts(toDistricts);
  }, [where, to, districts]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const whereName = getNameById(where, regions);
    const fromDistrictName = getNameById(data.tuman, districts);
    const toName = getNameById(to, regions);
    const toDistrictName = getNameById(data.to_tuman, districts);

    const formData = {
      ...data,
      where: whereName,
      tuman: fromDistrictName,
      whereTo: toName,
      tuman2: toDistrictName,
    };
    try {
      const response = await sendNewUser(formData, token);
      if (response) {
        toast({
          title: "Yo'lovchi yuborildi!",
          description: "So'rovingiz tez orada ko'rib chiqiladi.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          setIsLoading(false);
          if (!isUser) {
            navigate("/driver/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Xatolik!",
        description: "Ma'lumot yuborishda xatolik yuz berdi.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LocationStep
            control={control}
            regions={regions}
            filteredFromDistricts={filteredFromDistricts}
            filteredToDistricts={filteredToDistricts}
            setValue={setValue}
            errors={errors}
          />
        );
      case 1:
        return <PassengersAndCostStep control={control} errors={errors} />;
      case 2:
        return <PersonalInfoStep control={control} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <Layout isHeader={!isUser} isBottom={!isUser}>
      <Box maxWidth="600px" margin="auto" padding="4">
        <Flex justify="space-between" mb="6">
          {steps.map((step, index) => (
            <Flex
              key={step.title}
              direction="column"
              align="center"
              opacity={index <= currentStep ? 1 : 0.5}
            >
              <Box
                as={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <step.icon size={24} />
              </Box>
              <Text fontSize="sm">{step.title}</Text>
            </Flex>
          ))}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="hidden"
            {...control.register("request_type")}
            value={isPost ? "pochta_berish" : "yolovchi_berish"}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          <Flex justify="space-between" mt="6">
            <Button onClick={prevStep} disabled={currentStep === 0}>
              Orqaga
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button colorScheme="teal" onClick={nextStep}>
                Keyingisi
              </Button>
            ) : (
              <Button
                isLoading={isLoading}
                type="submit"
                colorScheme="teal"
                width="full"
              >
                Yuborish
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </Layout>
  );
};
export default TransportForm;
