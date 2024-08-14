import React from "react";
import { Box, Spinner, Flex } from "@chakra-ui/react";

const LoadingOverlay = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      zIndex="overlay" // Ensure it appears on top of other content
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </Box>
  );
};

export default LoadingOverlay;
