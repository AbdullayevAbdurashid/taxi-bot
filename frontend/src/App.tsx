import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@chakra-ui/react";
import useTelegram from "./hooks/useTelegram";
import MainPage from "./pages/MainPage";
import { checkColorScheme } from "./utils/main";
import useApi from "./hooks/useSupabase";
import Wizard from "./pages/MakeOrder";
import OrderSuccessPage from "./pages/OrderSuccess";
import VerifyDriver from "./pages/VerifyDriver";
import TelegramLoginButton from "react-telegram-login";
import { UpdateDriver } from "./pages/UpdateDriver";
const App = () => {
  const { user, tg, setUser } = useTelegram();
  const { checkUserExists, loading } = useApi();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (tg !== undefined) {
      tg.ready();
      checkColorScheme(tg);
    }

    const checkIfExists = async (user) => {
      try {
        const exists = await checkUserExists(user);
        setUserExists(exists.isExists);
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    };

    if (user) {
      checkIfExists(user);
    }
  }, [user]);

  const handleTelegramResponse = useCallback(
    async (response) => {
      setUser(response);
      try {
        const exists = await checkUserExists(response.id);
        setUserExists(exists);
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    },
    [checkUserExists, setUser]
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Container maxW={"sm"}>
        {!user && (
          <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="fvtaxi_bot"
          />
        )}
        {user && (
          <Routes>
            <Route
              path="/"
              element={userExists ? <Navigate to="/wizard" /> : <MainPage />}
            />
            <Route
              path="/wizard"
              element={userExists ? <Wizard /> : <Navigate to="/" />}
            />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/driver" element={<VerifyDriver />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/driver/update" element={<UpdateDriver />} />
          </Routes>
        )}
      </Container>
    </Router>
  );
};

export default App;
