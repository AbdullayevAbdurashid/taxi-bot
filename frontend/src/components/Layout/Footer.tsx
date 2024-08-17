import React from "react";
import { Text, Divider } from "@chakra-ui/react";
function Footer() {
  const date = new Date();
  return (
    <>
      <Divider />
      <Text fontStyle={"italic"} textAlign={"center"} w={"100%"}>
        {" "}
        Cradev {date.getFullYear()}
      </Text>
    </>
  );
}

export default Footer;
