// SearchPage.js
import { useState } from "react";
import { VStack, Box, Spinner } from "@chakra-ui/react";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import ResultItem from "../../components/Common/ResultItem";
import CitySelector from "../../components/Forms/CitySelector";
import { originalWhereOptions, originalWhereToOptions } from "../../db/options";
import useDriver from "../../hooks/useDriver";
import {
  fetchSearchResults,
  postGetRequest,
  // fetchGetRequests,
  // fetchRequestDetails,
} from "../../api/driverService";
import Layout from "../../components/Layout";

const GetParcel = () => {
  const { user, loading: userLoading, error: userError } = useDriver();
  const [results, setResults] = useState([]);
  const [show, setIsShow] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (data) => {
    setLoading(true);
    try {
      const response = await fetchSearchResults(data.where, data.whereTo);
      const filteredResults = response.filter(
        (result) => result.request_type === "pochta_berish"
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
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await postGetRequest(
        user?.id,
        selectedRequestId,
        token,
        "pochta_olish"
      );
      setIsShow(true);
      alert(`Telefon raqami pastdagi jadvalda chiqadi`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setConfirmationOpen(false);
    }
  };

  if (userLoading) return <Spinner size="lg" />;
  if (userError) return <p>Error fetching user profile</p>;
  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <CitySelector
            whereOptions={originalWhereOptions}
            whereToOptions={originalWhereToOptions}
            onSearch={handleSearch}
            isLoading={loading}
          />
        </Box>
        {results.length === 0 ? <h1>Hech narsa topilmadi</h1> : null}
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
          message={`Telefon raqamni ko'rishni tasdiqlaysizmi?Balansingizdan 7500 so'm ayriladi'`}
          isOpen={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={confirmShowPhoneNumber}
        />
      </VStack>
    </Layout>
  );
};

export default GetParcel;
