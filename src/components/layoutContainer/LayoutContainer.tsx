import React, { FC } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { layout, palette } from "core/styles";
import styles from "./LayoutContainer.styles";
import type { LayoutContainerProps } from "./LayoutContainer.types";
import { useLayoutContainer } from "./useLayoutContainer";

const LayoutContainer: FC<LayoutContainerProps> = ({
  children,
  style,
  scrollStyle,
  contentContainerStyle,
  keyboardAvoidingViewStyle,
  edges,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = "always",
  keyboardBehavior,
  keyboardVerticalOffset,
  onContentSizeChange,
  footer,
  highlighted = false,
  stickyHeaderIndices,
  header,
  autoScrollToBottom = false,
  gradientColors = [palette.RED2, palette.RED],
}) => {
  const { scrollRef, handleContentSizeChange } = useLayoutContainer({
    autoScrollToBottom,
    onContentSizeChange,
  });

  const content = (
    <SafeAreaView
      style={[
        styles.mainContainer,
        highlighted && { backgroundColor: "transparent" },
        !highlighted && style,
      ]}
      edges={edges}
    >
      {header}
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[layout.flex1, keyboardAvoidingViewStyle]}
      >
        <ScrollView
          ref={scrollRef}
          style={[styles.innerContainer, scrollStyle]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={handleContentSizeChange}
          stickyHeaderIndices={stickyHeaderIndices}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
      {footer}
    </SafeAreaView>
  );

  if (highlighted) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1859, 1]}
        style={[styles.mainContainer, style]}
      >
        {content}
      </LinearGradient>
    );
  }

  return content;
};

export default LayoutContainer;
