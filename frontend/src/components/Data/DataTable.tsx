import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
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
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(fetchData);

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
          setLoading(false);
        });
    } else {
      setData(dataProp);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [apiUrl]);

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

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (data.length === 0) {
    return (
      <Center>
        <Text>No data available</Text>
      </Center>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {dataKeys.map((key, colIndex) => (
                <Td key={colIndex}>
                  {key === "available" ? (
                    <Text color={row[key] ? "green.500" : "red.500"}>
                      {row[key] ? "Xa" : "Yoq"}
                    </Text>
                  ) : (
                    row[key]
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
