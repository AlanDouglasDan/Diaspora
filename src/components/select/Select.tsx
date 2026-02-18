import React, { FC } from "react";
import { View, Text } from "react-native";
import {
  Dropdown,
  MultiSelect as RNMultiSelect,
} from "react-native-element-dropdown";

import type { SelectProps } from "./Select.types";
import { styles } from "./Select.styles";

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  style,
  dropdownPosition = "auto",
  multiple = false,
}) => {
  if (multiple) {
    const multiValue = Array.isArray(value) ? value : value ? [value] : [];

    return (
      <View style={style}>
        {label && <Text style={styles.label}>{label}</Text>}

        <RNMultiSelect
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          iconStyle={styles.iconStyle}
          data={options}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={multiValue}
          onChange={(items) => onChange(items)}
          dropdownPosition={dropdownPosition}
          selectedStyle={styles.selectedItemStyle}
        />
      </View>
    );
  }

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value as string}
        onChange={(item) => onChange(item.value)}
        dropdownPosition={dropdownPosition}
      />
    </View>
  );
};

export default Select;
