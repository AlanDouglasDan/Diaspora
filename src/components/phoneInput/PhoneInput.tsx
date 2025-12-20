import React, { FC } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { FlagButton } from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import { common, palette } from "core/styles";
import type { PhoneInputProps } from "./PhoneInput.types";
import { styles } from "./PhoneInput.styles";
import { usePhoneInputLogic } from "./usePhoneInputLogic";

const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChangeText,
  countryCode,
  callingCode,
  onSelectCountry,
  placeholder,
  style,
}) => {
  const {
    modalVisible,
    searchQuery,
    setSearchQuery,
    filteredCountries,
    handleOpenModal,
    handleCloseModal,
    handleSelectCountry,
  } = usePhoneInputLogic({ onSelectCountry });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.countrySelector}
        onPress={handleOpenModal}
      >
        <FlagButton
          countryCode={countryCode}
          withEmoji
          placeholder=""
          onOpen={() => {}}
        />
        <Text style={styles.callingCode}>+{callingCode}</Text>

        <Entypo name="chevron-down" size={16} color={palette.INPUT_TEXT} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>

            <Text style={styles.modalTitle}>
              Select Country
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search country"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />

            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.cca2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleSelectCountry(item)}
              >
                <FlagButton
                  countryCode={item.cca2}
                  withEmoji
                  placeholder=""
                  onOpen={() => {}}
                />
                <Text style={styles.countryName}>
                  {typeof item.name === "string" ? item.name : ""} +
                  {item.callingCode[0]}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default PhoneInput;
