import {
  Box,
  Text,
  VStack,
  HStack,
  Stack,
  Divider,
  Link,
} from "@chakra-ui/react";
import React from "react";
const Orders = ({ orders }) => {
  return (
    <VStack w="full" spacing={4} align="flex-start">
      {orders.map((order) => (
        <Box
          key={order.id}
          w="full"
          p={4}
          borderWidth={1}
          borderRadius="md"
          borderColor={"black"}
          shadow="sm"
        >
          <HStack justify="space-between">
            <VStack align="flex-start">
              <Text fontWeight="bold" fontSize="lg">
                {order.request.request_type === "yolovchi_berish"
                  ? "Yolovchi"
                  : "Pochta"}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Qayerdan: {order.request.where.toUpperCase() || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Qayerga: {order.request.whereTo.toUpperCase() || "N/A"}
              </Text>
            </VStack>
            <VStack align="flex-end">
              <Text
                as={Link}
                href={"tel:" + order.request.phone_number}
                fontSize="sm"
              >
                {order.request.phone_number}
              </Text>
            </VStack>
          </HStack>
          <Divider my={2} />
          <Text fontSize="xs">
            Vaqti: {new Date(order.created_at).toLocaleString("uz-uz")}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default React.memo(Orders);
