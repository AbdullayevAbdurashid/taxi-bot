import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddDriverModal = ({ apiUrl, onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    available: false,
    location: "",
    passengers: 0,
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl + "/new", formData);
      toast({
        title: "Driver added.",
        description: "The driver has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onAdd(); // Callback to refresh data in DataTable
      onClose();
    } catch (error) {
      console.error("Error adding driver:", error);
      toast({
        title: "Error.",
        description: "There was an error adding the driver.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} bg="blue.600" mb={4}>
        Xaydovchi qo'shish
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="fullName" mb={4}>
              <FormLabel>Ismi</FormLabel>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="phoneNumber" mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon>+998</InputLeftAddon>
                <Input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add Driver
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDriverModal;
