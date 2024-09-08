import { useEffect, useState } from "react";
import { VStack, Box, Spinner, Text } from "@chakra-ui/react";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import ResultItem from "../../components/Common/ResultItem";
import CitySelector from "../../components/Forms/CitySelector";
import { originalWhereOptions, originalWhereToOptions } from "../../db/options";
import useDriver from "../../hooks/useDriver";
import { fetchSearchResults, postGetRequest } from "../../api/driverService";
import Layout from "../../components/Layout";

const SearchPage = () => {
  const { user, loading: userLoading, error: userError } = useDriver();
  const [results, setResults] = useState([]);
  const [show, setShow] = useState<{ [key: number]: boolean }>({});
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const handleSearch = async (data) => {
    setLoading(true);
    try {
      const response = await fetchSearchResults(
        data.where.toLowerCase(),
        data.whereTo.toLowerCase()
      );
      const filteredResults = response.filter(
        (result) => result.request_type === "yolovchi_berish"
      );
      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRegionsAndDistricts = async () => {
      const regionsResponse = await fetch("/regions.json");
      setLoading(true);
      const regionsData = await regionsResponse.json();
      setDistricts(regionsData);

      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    fetchRegionsAndDistricts();
  }, []);
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

      const response = await postGetRequest(
        user?.id,
        selectedRequestId,
        token,
        "yolovchi_olish"
      );

      if (response) {
        setShow({ [selectedRequestId]: true });
      }
    } catch (error) {
      console.error("Error confirming phone number:", error);
    } finally {
      setConfirmationOpen(false);
    }
  };

  if (userLoading) return <Spinner size="lg" />;
  if (userError) return <Text>Error fetching user profile</Text>;
  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          {districts && (
            <CitySelector
              whereOptions={districts}
              whereToOptions={districts}
              onSearch={handleSearch}
              isLoading={loading}
            />
          )}
        </Box>
        {!results && results.length === 0 && <Text>Hech narsa topilmadi</Text>}
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <Box>
            {results &&
              results.map((result, index) => (
                <ResultItem
                  index={index}
                  key={result.id}
                  result={result}
                  showPhoneNumber={show[result.id]}
                  onShowPhoneNumber={() => handleShowPhoneNumber(result.id)}
                />
              ))}
          </Box>
        )}
        <ConfirmationModal
          message="Telefon raqamni ko'rishni tasdiqlaysizmi? Balansingizdan 7500 so'm ayriladi."
          isOpen={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={confirmShowPhoneNumber}
        />
      </VStack>
    </Layout>
  );
};

export default SearchPage;
