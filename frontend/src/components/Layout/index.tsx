// Layout.js
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
const Layout = ({ children, isHeader = true, ...args }) => {
  return (
    <Box as="main" w="full">
      {isHeader && <Header />}

      <Container
        {...args}
        maxW={{ base: "100%", md: "2xl" }}
        pt={20}
        centerContent
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
