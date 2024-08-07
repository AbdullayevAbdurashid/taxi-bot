import { Box, Flex, Icon, Text, Container } from "@chakra-ui/react";
import { FaUser, FaRss, FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = ({ children }) => {
  const admin = sessionStorage.getItem("admin");

  if (!admin) {
    return <Container>Not allowd</Container>;
  }
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      width={"10%"}
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="red"
      borderRightWidth="1px"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          Choc UI
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={FaUser}> Users</NavItem>
        <Link to={"/admin/drivers"}>
          <NavItem icon={FaCar}>Drivers</NavItem>
        </Link>
        <Link to={"/admin/orders"}>
          <NavItem icon={FaRss}>Orders</NavItem>
        </Link>
      </Flex>
    </Box>
  );
  return (
    <Flex as="section" minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Box border={"1px solid white"} w={"100%"}>
        {children}
      </Box>
    </Flex>
  );
};
export default Sidebar;
