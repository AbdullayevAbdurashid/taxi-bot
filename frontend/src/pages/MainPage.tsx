import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import RegistrationForm from "../components/Forms/RegistrationForm";
import useTelegram from "../hooks/useTelegram";
import useSupabase from "../hooks/useSupabase";
import { useNavigate } from "react-router-dom";
export default function MainPage() {
  const navigate = useNavigate();
  const { setUser, user } = useTelegram();
  const { checkUserExists } = useSupabase();
  const toast = useToast();
  useEffect(() => {
    if (user && user.phone !== undefined) {
      navigate("/wizard");
    }
  }, []);

  const handleSubmit = async (data) => {
    const userToAdd = {
      id: user.id,
      first_name: data.first_name,
      family_name: data.last_name,
      phone: "+998" + data.phone,
      name: user.first_name,
      photo_url: user.photo_url,
    };
    try {
      const newUser = await checkUserExists(userToAdd);
      if (newUser) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setUser(userToAdd);
        navigate("/wizard");
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      toast({
        title: "Error",
        description: "An error occurred while creating your account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    localStorage.setItem("user", JSON.stringify(userToAdd));
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
      >
        <RegistrationForm submit={handleSubmit} />
      </Box>
    </>
  );
}
