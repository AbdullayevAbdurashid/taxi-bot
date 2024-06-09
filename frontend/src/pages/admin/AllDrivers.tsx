import { useState } from "react";

import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";

import DataTable from "../../components/Data/DataTable";
import AddDriverModal from "../../components/Modals/AddDrivers";
const DriverList = () => {
  const toast = useToast();
  const headers = [
    "Ismi",
    "Telefon raqami",
    "Parol",
    "Zakaz oladimi?",
    "Joylashuvi",
    "Yolovchilar soni",
  ];
  const keys = [
    "fullName",
    "phoneNumber",
    "password",
    "available",
    "location",
    "passengers",
  ];
  const socketUrl = `${import.meta.env.VITE_API_ENDPOINT}/`; // Replace with your Socket.IO server URL
  const socketEvent = "driverUpdated"; // The event name to listen for
  const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/drivers`;
  const [refresh, setRefresh] = useState(false);

  const handleAddDriver = () => {
    setRefresh(!refresh);
  };

  console.log(import.meta.env.VITE_API_ENDPOINT);
  const handleDeleteDriver = (id) => {
    axios
      .delete(`${apiUrl}/delete/${id}`)
      .then(() => {
        toast({
          title: "Driver deleted.",
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
      <AddDriverModal apiUrl={apiUrl} onAdd={handleAddDriver} />
      <DataTable
        refresh={refresh}
        socketEvent={socketEvent}
        socketUrl={socketUrl}
        apiUrl={apiUrl}
        dataKeys={keys}
        headers={headers}
        onDelete={handleDeleteDriver}
      />
    </Box>
  );
};

export default DriverList;
