import type { ReactNode } from "react";

export interface SwipeableCardRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

export interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled?: boolean;
}
