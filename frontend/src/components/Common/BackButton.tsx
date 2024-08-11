// BackButton.js
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const BackButton = ({ ariaLabel = "Orqaga" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box>
      <Button
        aria-label={ariaLabel}
        onClick={handleBack}
        borderRadius={150}
        colorScheme="teal"
        size="md"
      >
        {/* <ChevronLeftIcon fontSize={"3xl"} /> */}
        {ariaLabel}
      </Button>
    </Box>
  );
};

export default BackButton;
