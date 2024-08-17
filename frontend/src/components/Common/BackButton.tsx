// BackButton.js
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
        borderRadius={50}
        colorScheme="teal"
        size="sm"
      >
        <ArrowBackIcon mr={1} />
        {/* <ChevronLeftIcon fontSize={"3xl"} /> */}
        {ariaLabel}
      </Button>
    </Box>
  );
};

export default BackButton;
