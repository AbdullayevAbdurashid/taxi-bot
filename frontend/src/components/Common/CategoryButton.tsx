import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Icon,
} from "@chakra-ui/react";

const CategoryButton = ({ category, onClick }) => {
  const buttonBg = useColorModeValue(
    category.bgColor,
    `${category.bgColor.split(".")[0]}.700`
  );
  const buttonHoverBg = useColorModeValue(
    category.hoverBgColor,
    `${category.hoverBgColor.split(".")[0]}.600`
  );
  const iconColor = category.iconColor || "white";

  return (
    <Box
      as="button"
      onClick={onClick}
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={buttonBg}
      color={useColorModeValue("gray.700", "white")}
      transition="all 0.3s"
      _hover={{
        bg: buttonHoverBg,
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
    >
      <VStack spacing={3}>
        <Icon as={category.icon} boxSize="40px" color={iconColor} />
        <Heading size="sm" color={"gray.100"}>
          {category.name}
        </Heading>
      </VStack>
    </Box>
  );
};
export default CategoryButton;
