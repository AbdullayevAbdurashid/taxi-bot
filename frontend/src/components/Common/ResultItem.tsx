// ResultItem.js
import React from "react";
import { Box, Text, Button, IconButton } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ResultItem = ({ result, index, onShowPhoneNumber, showPhoneNumber }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
    <Text>
      Qayerdan: {result.where} {result.tuman} {result.tuman2}
    </Text>
    <Text>
      Qayerga: {result.whereTo} {result.tuman} {result.tuman2}
    </Text>
    <Text>
      Telefon Raqam:{" "}
      {showPhoneNumber ? (
        result.phone_number
      ) : (
        <>
          {"*".repeat(result.phone_number.length)}{" "}
          <IconButton
            icon={<ViewIcon />}
            aria-label="View phone number"
            onClick={() => onShowPhoneNumber(result.id, index)}
          />
        </>
      )}
    </Text>
  </Box>
);

export default ResultItem;
