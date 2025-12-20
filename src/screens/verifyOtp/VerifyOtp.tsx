import React, { FC } from "react";
import { Platform, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { LayoutContainer } from "components/layoutContainer";
import { layout, palette } from "core/styles";
import type { VerifyOtpScreenProps } from "./VerifyOtp.types";
import { styles } from "./VerifyOtp.styles";
import { useVerifyOtpLogic } from "./useVerifyOtpLogic";

const CELL_COUNT = 6;

const VerifyOtp: FC<VerifyOtpScreenProps> = (props) => {
  const { code, setCode, handleGoBack, handleSubmit, context, value } =
    useVerifyOtpLogic(props);

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <LayoutContainer
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
      highlighted
    >
      <View style={layout.flex1}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo name="chevron-left" size={24} color={palette.WHITE} />
        </TouchableOpacity>

        <Text style={styles.title}>
          {context === "email" ? "Verify your email" : "Verify Code"}
        </Text>

        <Text style={styles.subtitle}>
          {context === "email"
            ? "You've got mail. Enter your personal confirmation code here."
            : `Enter the code sent to ${value}.`}
        </Text>

        <CodeField
          ref={ref}
          {...codeFieldProps}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldContainer}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={styles.cell}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <Text style={styles.header14}>Resend</Text>
      </View>

      <TouchableOpacity
        disabled={code.length !== CELL_COUNT}
        style={[
          styles.button,
          { opacity: code.length === CELL_COUNT ? 1 : 0.5 },
        ]}
        onPress={handleSubmit}
      >
        <FontAwesome6 name="arrow-right" size={20} color={palette.BLACK} />
      </TouchableOpacity>
    </LayoutContainer>
  );
};

export default VerifyOtp;
