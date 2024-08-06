import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const SubmitStatus = ({ onReturn }) => (
  <Box textAlign="center">
    <Text mb={4}>
      Sizning so'rovingiz muvaffaqqiyatli jo'natildi. Adminlar so'rovni ko'rib
      chiqishadi va balans hisobingizga tushadi.
    </Text>
    <Button onClick={onReturn} colorScheme="teal">
      Sahifaga qaytish
    </Button>
  </Box>
);

export default SubmitStatus;
