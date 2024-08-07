import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "../lib/icons/AnimatedCheckmark";
import { Flex } from "@chakra-ui/react";

//need to add translation for this page
const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const progress = useMotionValue(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"90vh"}
      w={"90%"}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress, position: "absolute", left: "3%", top: "19%" }}
        transition={{ duration: 1 }}
      >
        <CircularProgress progress={progress} />
      </motion.div>
      <h1 style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
        Buyurtma qabul qilindi! Siz bilan tez orada bo'glanishadi
      </h1>
      <p style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
        Tez o'rada siz bilan bog'lanamiz
      </p>
    </Flex>
  );
};

export default OrderSuccessPage;
