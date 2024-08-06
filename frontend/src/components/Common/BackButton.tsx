// BackButton.js
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const BackButton = ({ ariaLabel = "Go back" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box position="absolute" top={2} left={4} zIndex={1000}>
      <Button
        // icon={<ChevronLeftIcon />}
        aria-label={ariaLabel}
        onClick={handleBack}
        borderRadius={100}
        // variant="outline"
        colorScheme="teal"
        size="md"
      >
        {" "}
        Orqaga
      </Button>
    </Box>
  );
};

export default BackButton;
