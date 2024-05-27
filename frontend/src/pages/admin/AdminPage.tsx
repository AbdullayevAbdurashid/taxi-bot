import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import AdminSidebar from "./AdminSidebar";
import AdminAuth from "./AdminAuth";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Flex>Hello admin!</Flex>
      ) : (
        <AdminAuth onLogin={handleLogin} />
      )}
    </>
  );
};

export default AdminPage;
