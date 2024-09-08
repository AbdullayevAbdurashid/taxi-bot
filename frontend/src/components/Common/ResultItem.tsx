// ResultItem.js
import React from "react";
import { Box, Text, Button, IconButton, Tag } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import CurrencyFormat from "react-currency-format";

const ResultItem = ({ result, index, onShowPhoneNumber, showPhoneNumber }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
    <Text>
      Qayerdan:{result.where.toUpperCase()}
      {result.tuman.toUpperCase()}
    </Text>
    <Text>
      Qayerga: {result.whereTo.toUpperCase()}, {result.tuman2.toUpperCase()}
    </Text>

    <Text>Jinsi: {result.gender}</Text>
    <Text>
      Narxi:{" "}
      <CurrencyFormat
        value={result.cost}
        displayType="text"
        thousandSeparator={true}
        suffix=" so'm"
      />
    </Text>
    <Text>
      Telefon Raqam:{" "}
      {showPhoneNumber ? (
        result.phone_number
      ) : (
        <>
          {/* {"*".repeat(result.phone_number.length)}{" "} */}
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
