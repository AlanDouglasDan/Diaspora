import { useMemo } from "react";

import type { ButtonProps } from "./Button.types";
import { styles } from "./Button.styles";

export function useButtonLogic(props: ButtonProps) {
  const { variant = "default", disabled, loading } = props;

  const isWhite = variant === "white";
  const isDisabled = disabled || loading;

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      isWhite && styles.whiteContainer,
      isDisabled && styles.disabled,
      props.style,
    ];
  }, [isWhite, isDisabled, props.style]);

  const titleStyle = useMemo(() => {
    return [styles.title, isWhite && styles.whiteTitle, props.textStyle];
  }, [isWhite, props.textStyle]);

  return {
    isWhite,
    isDisabled,
    containerStyle,
    titleStyle,
  };
}
