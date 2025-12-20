import { useState } from "react";
import type { InterestsScreenProps, Interest } from "./Interests.types";

export const INTERESTS_DATA: Interest[] = [
  { id: "travelling", label: "Travelling", emoji: "🛫" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "painting", label: "Painting", emoji: "🖼️" },
  { id: "yoga", label: "Yoga", emoji: "🧘" },
  { id: "dancing", label: "Dancing", emoji: "💃" },
  { id: "movie", label: "Movie", emoji: "🎬" },
  { id: "tennis", label: "Tennis", emoji: "🎾" },
  { id: "soccer", label: "Soccer", emoji: "⚽" },
  { id: "basketball", label: "Basketball", emoji: "🏀" },
  { id: "ambition", label: "Ambition", emoji: "🚀" },
  { id: "writing", label: "Writing", emoji: "📝" },
  { id: "grab_a_drink", label: "Grab a drink", emoji: "🍷" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "astrology", label: "Astrology", emoji: "🔮" },
  { id: "game", label: "Game", emoji: "🎮" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "netflix", label: "Netflix", emoji: "📺" },
  { id: "walking", label: "Walking", emoji: "🚶" },
  { id: "surfing", label: "Surfing", emoji: "🏄" },
  { id: "hiking", label: "Hiking", emoji: "⛰️" },
  { id: "swimming", label: "Swimming", emoji: "🏊" },
  { id: "singing", label: "Singing", emoji: "🎤" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "confidence", label: "Confidence", emoji: "😊" },
];

export function useInterestsLogic({ navigation }: InterestsScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      }
      return [...prev, interestId];
    });
  };

  const isInterestSelected = (interestId: string) => {
    return selectedInterests.includes(interestId);
  };

  const handleSkip = () => {
    navigation.navigate("AddPhotos");
  };

  const handleSubmit = () => {
    navigation.navigate("AddPhotos");
  };

  const isValid = selectedInterests.length > 0;

  return {
    selectedInterests,
    handleGoBack,
    handleToggleInterest,
    isInterestSelected,
    handleSkip,
    handleSubmit,
    isValid,
  };
}
