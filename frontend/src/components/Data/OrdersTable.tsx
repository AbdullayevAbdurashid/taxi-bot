import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Link,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState, useMemo } from "react";

const Orders = ({ orders }) => {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  console.log(orders);
  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesType =
        filterType === "all" || order.request.request_type === filterType;
      const matchesSearch = order.request.whereTo
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [orders, filterType, searchQuery]);

  return (
    <VStack w="full" spacing={4} align="flex-start">
      {/* Filters */}
      <HStack w="full" spacing={4} align="center">
        <Select
          // placeholder="Buyurtma turi"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          w="40%"
        >
          <option value="all">Hammasi</option>
          <option value="yolovchi_berish">Yolovchi</option>
          <option value="pochta_berish">Pochta</option>
        </Select>
        <Input
          placeholder="Manzil bo'yicha qidirish"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          w="60%"
        />
      </HStack>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Box
            key={order.id}
            w="full"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="black"
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
                  Qayerdan: {order.request.where?.toUpperCase() || "N/A"}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Qayerga: {order.request.whereTo?.toUpperCase() || "N/A"}
                </Text>
              </VStack>
              <VStack align="flex-end">
                <Text
                  as={Link}
                  href={`tel:${order.request.phone_number}`}
                  fontSize="sm"
                >
                  {order.request.phone_number}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))
      ) : (
        <Text>Buyurtmalar topilmadi</Text>
      )}
    </VStack>
  );
};

export default React.memo(Orders);
