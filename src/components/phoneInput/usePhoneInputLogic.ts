import { useState } from "react";
import type { Country } from "react-native-country-picker-modal";
import { getAllCountries } from "react-native-country-picker-modal";

interface UsePhoneInputLogicParams {
  onSelectCountry: (countryCode: Country["cca2"], callingCode: string) => void;
}

export function usePhoneInputLogic({
  onSelectCountry,
}: UsePhoneInputLogicParams) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  const loadCountries = async () => {
    const allCountries = await getAllCountries("emoji" as any);
    setCountries(allCountries);
  };

  const handleOpenModal = () => {
    loadCountries();
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  const handleSelectCountry = (country: Country) => {
    onSelectCountry(country.cca2, country.callingCode[0] || "");
    handleCloseModal();
  };

  const filteredCountries = countries.filter((country) => {
    const name = typeof country.name === "string" ? country.name : "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return {
    modalVisible,
    searchQuery,
    setSearchQuery,
    filteredCountries,
    handleOpenModal,
    handleCloseModal,
    handleSelectCountry,
  };
}
