// Layout.js
import { Box, Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box as="main" w="full">
      <Container maxW="xl">{children}</Container>
    </Box>
  );
};

export default Layout;
