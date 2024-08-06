// SearchPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, VStack, Box, Spinner } from "@chakra-ui/react";
import BackButton from "../../components/Common/BackButton";
import ConfirmationModal from "../../components/Common/Modal";
import ResultItem from "../../components/Common/ResultItem";
import CitySelector from "../../components/Forms/CitySelector";
import { originalWhereOptions, originalWhereToOptions } from "../../db/options";
import { useForm } from "react-hook-form";

const SearchPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [show, setIsShow] = useState(false);
  const [getRequestData, setGetRequestData] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get(
            "https://taksibot.pythonanywhere.com/users/profile/",
            {
              headers: { Authorization: `JWT ${token}` },
            }
          );
          const { id } = response.data;
          setUserId(id);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSearch = async (data) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://taksibot.pythonanywhere.com/search/?where=${data.where}&whereTo=${data.whereTo}`
      );
      const filteredResults = response.data.filter(
        (result) => result.request_type === "yolovchi_berish"
      );
      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPhoneNumber = (requestId) => {
    setSelectedRequestId(requestId);
    setConfirmationOpen(true);
  };

  const confirmShowPhoneNumber = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "https://taksibot.pythonanywhere.com/getrequests/",
        {
          user: userId,
          request: selectedRequestId,
          getrequest_type: "yolovchi_olish",
        },
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );

      const { phone_number } = response.data; // assuming response contains phone_number

      setResults((prevResults) =>
        prevResults.map((result) =>
          result.id === selectedRequestId ? { ...result, phone_number } : result
        )
      );

      setIsShow(true); // Set aniqlik to true when the user confirms
      alert(`Telefon raqami pastdagi jadvalda chiqadi`);

      // Fetch getrequest data
      const getRequestResponse = await axios.get(
        "https://taksibot.pythonanywhere.com/getrequests/",
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );
      const getRequestData = getRequestResponse.data;

      // Fetch request data for each getrequest
      const requestDetails = await Promise.all(
        getRequestData.map(async (getRequest) => {
          const requestResponse = await axios.get(
            `https://taksibot.pythonanywhere.com/requests/${getRequest.request}/`,
            {
              headers: { Authorization: `JWT ${token}` },
            }
          );
          return {
            ...getRequest,
            phone_number: requestResponse.data.phone_number,
          };
        })
      );

      setGetRequestData(requestDetails);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setConfirmationOpen(false);
    }
  };

  return (
    <Container pt={10}>
      <BackButton />
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <CitySelector
            whereOptions={originalWhereOptions}
            whereToOptions={originalWhereToOptions}
            onSearch={handleSearch}
            isLoading={loading}
          />
        </Box>

        {loading ? (
          <Spinner size="lg" />
        ) : (
          <Box>
            {results.map((result, indx) => (
              <ResultItem
                index={indx}
                key={result.id}
                result={result}
                showPhoneNumber={show}
                onShowPhoneNumber={() => handleShowPhoneNumber(result.id)}
              />
            ))}
          </Box>
        )}

        <ConfirmationModal
          message={`Telefon raqamni ko'rishni tasdiqlaysizmi?`}
          isOpen={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={confirmShowPhoneNumber}
        />
      </VStack>
    </Container>
  );
};

export default SearchPage;
