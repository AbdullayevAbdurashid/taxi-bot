import { Box, Container, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children, isHeader = true, ...args }) => {
  const location = useLocation();

  // Extract the title from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const pageTitle = queryParams.get("title") || null;

  return (
    <Box as="main" w="full">
      {/* Set the document title */}

      {isHeader && <Header />}

      <Container {...args} maxW={{ base: "100%", md: "2xl" }} pt={20}>
        {pageTitle && (
          <Heading
            as="h1"
            size="xl"
            textAlign="left"
            mb={2}
            textTransform="capitalize"
            color="teal.500"
          >
            {pageTitle}
          </Heading>
        )}

        {children}
      </Container>
    </Box>
  );
};

export default Layout;
