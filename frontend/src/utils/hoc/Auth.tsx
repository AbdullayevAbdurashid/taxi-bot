import React from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Auth = (WrappedComponent) => {
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toast = useToast();
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      toast({
        title: "Not Authenticated",
        description: "You are not authenticated. Redirecting to login...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return <Navigate to="/driver/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default Auth;
