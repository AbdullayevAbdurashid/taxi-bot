import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useBreakpointValue,
  useTheme,
} from "@chakra-ui/react";
import { FaHome, FaList, FaCog, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionFlex = motion(Flex);

const menuItems = [
  { label: "Asosiy", icon: <FaHome />, path: "/" },
  { label: "Buyurtmalar", icon: <FaList />, path: "/driver/orders" },
  { label: "Profil", icon: <FaUser />, path: "/driver/profile" },
];

const BottomMenu: React.FC = () => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [active, setActive] = useState<string | null>(null);

  if (!isMobile) return null; // Hide menu on larger screens

  const handleClick = (label: string) => {
    setActive(label);
    setTimeout(() => setActive(null), 300); // Reset active state after animation
  };

  return (
    <MotionFlex
      position="fixed"
      bottom={0}
      width="100%"
      bg={colorMode === "light" ? "white" : "gray.700"}
      boxShadow="md"
      py={2}
      alignItems="center"
      justifyContent="space-evenly"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
    >
      {menuItems.map((item) => (
        <Link key={item.label} to={item.path}>
          <Flex
            direction="column"
            align="center"
            onClick={() => handleClick(item.label)}
            cursor="pointer"
            justifyContent={"center"}
            transition="transform 0.2s"
            transform={active === item.label ? "scale(1.2)" : "scale(1)"}
          >
            <IconButton
              aria-label={item.label}
              icon={item.icon}
              colorScheme={"teal"}
              _hover={{ color: colors.teal[500] }}
              borderRadius="full"
            />
            <Text fontSize="sm">{item.label}</Text>
          </Flex>
        </Link>
      ))}
    </MotionFlex>
  );
};

export default BottomMenu;
