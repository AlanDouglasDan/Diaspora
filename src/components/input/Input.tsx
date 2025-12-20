import React, { forwardRef } from "react";
import { View, TextInput, Text } from "react-native";

import type { InputProps } from "./Input.types";
import { styles } from "./Input.styles";

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      style,
      backgroundColor,
      label,
      ...rest
    },
    ref
  ) => {
    return (
      <View style={style}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[styles.container, backgroundColor && { backgroundColor }]}
        >
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.input}
            {...rest}
          />
        </View>
      </View>
    );
  }
);

export default Input;
