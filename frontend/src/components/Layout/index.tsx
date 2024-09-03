import { Box, Container, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import BottomMenu from "./BottomMenu/BottomMenu";
const Layout = ({ children, isHeader = true, isBottom = true, ...args }) => {
  const location = useLocation();

  // Extract the title from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const pageTitle = queryParams.get("title") || null;

  return (
    <Box w="full">
      {/* Set the document title */}

      {isHeader && <Header />}

      <Container {...args} maxW={{ base: "100%", md: "2xl" }} pt={20}>
        {pageTitle && (
          <Heading
            as="h1"
            size="lg"
            textAlign="left"
            mb={2}
            textTransform="uppercase"
            color="teal.500"
          >
            {pageTitle}
          </Heading>
        )}
        <Box pb={20} as="main" minH={"100vh"}>
          {children}
        </Box>
      </Container>
      {isBottom && <BottomMenu />}
    </Box>
  );
};

export default Layout;
