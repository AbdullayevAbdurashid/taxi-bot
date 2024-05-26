import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom`";
import { CircularProgress } from "../lib/icons/AnimatedCheckmark";
import { Flex } from "@chakra-ui/react";
const OrderSuccessPage = () => {
  const [redirect, setRedirect] = useState(false);
  const progress = useMotionValue(100);
  // const [countdown, setCountdown] = useState(5);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdown(countdown - 1);
  //     if (countdown === 0) {
  //       setRedirect(true);
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [countdown]);

  // if (redirect) {
  //   return <Redirect to="/" />;
  // }

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
        Order received!
      </h1>
      <p style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
        You will be redirected to the main page in countdown seconds.
      </p>
    </Flex>
  );
};

export default OrderSuccessPage;
