import { useState } from "react";
// invalid working code
interface User {
  id: string;
  first_name: string;
  family_name: string;
  phone: string;
  name: string;
  photo_url: string;
}

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const createOrder = async (orderData) => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/orders/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating order:", errorData.message);
        setLoading(false);
        return null;
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkUserExists = async (user:any): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tg_id: user.id,
          fullName:user.first_name,
          photo:user.photo_url,
          userName:user.username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error checking user:", errorData.message);
        setLoading(false);
        return false;
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      return false;
    }
  };

  return { loading, checkUserExists,createOrder };
};

export default useApi;
