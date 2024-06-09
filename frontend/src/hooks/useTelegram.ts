import { useEffect } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp;


export default function useTelegram() {
  const [user, setTgUser] = useState<any>(tg.initDataUnsafe?.user);
  const setUser = (newUser: any) => {
    localStorage.setItem("user", JSON.stringify({...newUser, phone:undefined})), setTgUser(newUser  );
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && Object.keys(localUser).length > 0 ) {
      setTgUser(localUser);
    }
  }, []);

  return {
    tg,
    user,
    setUser,
  };
}
