import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { IconButton, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { io } from "socket.io-client";

const DataTable = ({
  apiUrl,
  headers,
  dataKeys,
  fetchData = true,
  dataProp = [],
  socketUrl,
  socketEvent,
  refresh,
  onDelete,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(fetchData);
  const toast = useToast();

  const fetchDataFromApi = () => {
    if (fetchData) {
      setLoading(true);
      axios
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast({
            title: "Error fetching data.",
            description: "There was an error fetching the data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      setData(dataProp);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [apiUrl, refresh]);

  useEffect(() => {
    const socket = io(socketUrl);

    socket.on(socketEvent, () => {
      console.log("Data updated, fetching new data...");
      fetchDataFromApi();
    });

    return () => {
      socket.off(socketEvent);
      socket.close();
    };
  }, [socketUrl, socketEvent]);

  // Function to get value from nested fields
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((value, key) => value && value[key], obj);
  };

  const columns = headers.map((header, index) => ({
    title: header,
    field: dataKeys[index],
  }));

  columns.push({
    title: "Actions",
    field: "actions",
    render: (rowData) => (
      <IconButton
        aria-label="Delete order"
        icon={<DeleteIcon />}
        colorScheme="red"
        onClick={() => onDelete(rowData._id)}
      />
    ),
  });

  const formattedData = data.map((row) => {
    const formattedRow = {};
    dataKeys.forEach((key) => {
      formattedRow[key] = getNestedValue(row, key);
    });
    formattedRow["_id"] = row["_id"];
    return formattedRow;
  });

  return (
    <MaterialTable
      title="Orders"
      columns={columns}
      data={formattedData}
      isLoading={loading}
      options={{
        sorting: true,
        search: true,
        paging: true,
      }}
    />
  );
};

export default DataTable;
