import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/driverService";

// Define the query function for fetching the user profile
const fetchProfile = async (token: string | null) => {
  if (!token) throw new Error("No access token found");
  return await fetchUserProfile(token);
};

const useDriver = () => {
  // Fetch token from session storage
  const token = localStorage.getItem("accessToken");

  // Use React Query to fetch user profile
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", token],
    queryFn: () => fetchProfile(token),
    enabled: !!token, // Only run the query if token is available
  });

  // Error handling
  if (isError) {
    console.error("isError", error); // Optionally log error
  }

  return { user, loading: isLoading, error };
};

export default useDriver;
