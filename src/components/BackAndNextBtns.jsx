import React from "react";
import { Box, Button } from "@chakra-ui/react";

const BackAndNext = ({ onBack, onNext, showBack, showNext }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={8} mt={16} mr={8} ml={8}>
      {/* Back Button */}
      {showBack && (
        <Button onClick={onBack} colorScheme="blue" variant="outline">
          Back
        </Button>
      )}

      {/* Spacer if only one button */}
      {!showBack && <Box />}

      {/* Next Button */}
      {showNext && (
        <Button onClick={onNext} colorScheme="blue" variant="solid">
          Next
        </Button>
      )}
    </Box>
  );
};

export default BackAndNext;
