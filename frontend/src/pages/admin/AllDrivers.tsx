import React from "react";
import { Box } from "@chakra-ui/react";
import DataTable from "../../components/Data/DataTable";

const DriverList = () => {
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
  const socketUrl = "http://localhost:4000/"; // Replace with your Socket.IO server URL
  const socketEvent = "driverUpdated"; // The event name to listen f
  const url = "http://localhost:4000/api/drivers";
  return (
    <Box p={4}>
      <DataTable
        socketEvent={socketEvent}
        socketUrl={socketUrl}
        apiUrl={url}
        dataKeys={keys}
        headers={headers}
      />
    </Box>
  );
};

export default DriverList;
