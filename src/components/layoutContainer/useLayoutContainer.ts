import { useCallback, useRef } from "react";
import type { ScrollView } from "react-native";

interface UseLayoutContainerParams {
  autoScrollToBottom: boolean;
  onContentSizeChange?: (contentWidth: number, contentHeight: number) => void;
}

export function useLayoutContainer({
  autoScrollToBottom,
  onContentSizeChange,
}: UseLayoutContainerParams) {
  const scrollRef = useRef<ScrollView>(null);

  const handleContentSizeChange = useCallback(
    (contentWidth: number, contentHeight: number) => {
      onContentSizeChange?.(contentWidth, contentHeight);

      if (autoScrollToBottom) {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        });
      }
    },
    [autoScrollToBottom, onContentSizeChange]
  );

  return {
    scrollRef,
    handleContentSizeChange,
  };
}
