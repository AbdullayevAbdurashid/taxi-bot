import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const AdminAuth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      e.target.username.value === "admin" &&
      e.target.password.value === "admin"
    ) {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Box maxW="400px" m="auto" p="4">
      <Heading as="h2" mb="4">
        Admin Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
        {error && (
          <Text mt="2" color="red.500">
            {error}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default AdminAuth;
