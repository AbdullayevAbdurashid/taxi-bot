import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import BackButton from "../Common/BackButton";
function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Flex
        position={"fixed"}
        left="50%"
        transform="translateX(-50%)"
        top={0}
        maxW={{ base: "100%", md: "2xl" }}
        width={"100%"}
        px={4}
        py={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px solid white"}
        backgroundColor={colorMode === "light" ? "gray.300" : "gray.900"}
        zIndex={1000} // Ensures the header stays on top of other content
      >
        <BackButton />

        <Link to="/driver/dashboard">
          <Heading textDecoration={"underline"} size="md" textAlign={"center"}>
            Asosiy menu
          </Heading>
        </Link>

        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle Theme"
          borderRadius={"xl"}
          colorScheme="teal"
          size="md"
          onClick={toggleColorMode}
        />
        <IconButton
          icon={<FaUser />}
          aria-label="Profile"
          borderRadius={"xl"}
          // variant={colorMode === "dark" ? "" : ""}
          colorScheme="teal"
          size="md"
          as={Link}
          to="/driver/profile" // Replace with your profile link
        />
      </Flex>
    </nav>
  );
}

export default Header;
