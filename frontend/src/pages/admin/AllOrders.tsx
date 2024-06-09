import { useState } from "react";

import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";

import DataTable from "../../components/Data/DataTable";
const OrdersList = () => {
  const toast = useToast();
  const headers = [
    "Yo'nalish",
    "Taklif qilingan pul",
    "Yo'lovchilar soni",
    "Buyurtma turi",
    "Safar sanasi",
    "Safar vaqti",
    "Yo'lovchi",
    "Telefon Raqami",
    // "Yaratilgan sana",
  ];
  const keys = [
    "routes",
    "offeredMoney",
    "numberOfPeople",
    "type",
    "rideDate",
    "rideTime",
    "tg_id.fullName",
    "phone",
    // "createdAt",
  ];
  const socketUrl = `${import.meta.env.VITE_API_ENDPOINT}/`; // Replace with your Socket.IO server URL
  const socketEvent = "orderUpdated"; // The event name to listen for
  const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/orders`;
  const [refresh, setRefresh] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/delete/${id}`)
      .then(() => {
        toast({
          title: "Order deleted.",
          description: "The driver has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error deleting driver:", error);
        toast({
          title: "Error.",
          description: "There was an error deleting the driver.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={4}>
      <DataTable
        refresh={refresh}
        socketEvent={socketEvent}
        socketUrl={socketUrl}
        apiUrl={apiUrl}
        dataKeys={keys}
        headers={headers}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default OrdersList;
