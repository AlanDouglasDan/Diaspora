import { useState, useCallback, useMemo } from "react";

import type {
  EditInterestsScreenProps,
  Interest,
  InterestCategory,
} from "./EditInterests.types";

const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: "travel",
    title: "Travel and Mobility",
    interests: [
      { id: "traveling", label: "Traveling", emoji: "🧳" },
      { id: "backpacking", label: "Backpacking", emoji: "🎒" },
      { id: "visa_tips", label: "Visa & immigration tips", emoji: "🛂" },
      { id: "safari", label: "Safari", emoji: "🦁" },
      { id: "volunteer_travel", label: "Volunteer travel", emoji: "🤝" },
      { id: "cruise_trips", label: "Cruise trips", emoji: "🚢" },
      { id: "road_trips", label: "Road trips", emoji: "🚗" },
      { id: "solo_travel", label: "Solo travel", emoji: "🧭" },
      { id: "luxury_travel", label: "Luxury travel", emoji: "✨" },
      { id: "budget_travel", label: "Budget travel", emoji: "💰" },
      { id: "adventure_travel", label: "Adventure travel", emoji: "🏔️" },
      { id: "beach_holidays", label: "Beach holidays", emoji: "🏖️" },
      { id: "city_breaks", label: "City breaks", emoji: "🌆" },
      { id: "cultural_tourism", label: "Cultural tourism", emoji: "🏛️" },
      { id: "eco_tourism", label: "Eco tourism", emoji: "🌿" },
    ],
  },
  {
    id: "adventure",
    title: "Adventure & Outdoors",
    interests: [
      { id: "camping", label: "Camping", emoji: "🏕️" },
      { id: "trail_running", label: "Trail running", emoji: "🏃" },
      { id: "mountaineering", label: "Mountaineering", emoji: "⛰️" },
      { id: "parkour", label: "Parkour", emoji: "🤸" },
      { id: "skydiving", label: "Skydiving", emoji: "🪂" },
      { id: "birdwatching", label: "Birdwatching", emoji: "🐦" },
      { id: "hiking", label: "Hiking", emoji: "🥾" },
      { id: "rock_climbing", label: "Rock climbing", emoji: "🧗" },
      { id: "scuba_diving", label: "Scuba diving", emoji: "🤿" },
      { id: "surfing", label: "Surfing", emoji: "🏄" },
      { id: "kayaking", label: "Kayaking", emoji: "🛶" },
      { id: "fishing", label: "Fishing", emoji: "🎣" },
      { id: "hunting", label: "Hunting", emoji: "🦌" },
      { id: "skiing", label: "Skiing", emoji: "⛷️" },
      { id: "snowboarding", label: "Snowboarding", emoji: "🏂" },
    ],
  },
  {
    id: "food",
    title: "Food & Drink (Dining Out)",
    interests: [
      { id: "street_food", label: "Street food", emoji: "🌮" },
      { id: "steakhouse", label: "Steakhouse", emoji: "🥩" },
      { id: "coffee_shops", label: "Coffee shops/cafés", emoji: "☕" },
      { id: "food_trucks", label: "Food trucks", emoji: "🚚" },
      { id: "seafood", label: "Seafood", emoji: "🦞" },
      { id: "fine_dining", label: "Fine dining", emoji: "🍷" },
      { id: "brunch", label: "Brunch", emoji: "🥞" },
      { id: "sushi", label: "Sushi", emoji: "🍣" },
      { id: "pizza", label: "Pizza", emoji: "🍕" },
      { id: "bbq", label: "BBQ", emoji: "🍖" },
      { id: "vegan_food", label: "Vegan food", emoji: "🥗" },
      { id: "wine_tasting", label: "Wine tasting", emoji: "🍇" },
      { id: "craft_beer", label: "Craft beer", emoji: "🍺" },
      { id: "cocktails", label: "Cocktails", emoji: "🍹" },
      { id: "baking", label: "Baking", emoji: "🧁" },
    ],
  },
  {
    id: "arts",
    title: "Arts & Entertainment",
    interests: [
      { id: "dancing", label: "Dancing", emoji: "💃" },
      { id: "movies", label: "Movies", emoji: "🎬" },
      { id: "concerts", label: "Concerts", emoji: "🎵" },
      { id: "theater", label: "Theater", emoji: "🎭" },
      { id: "museums", label: "Museums", emoji: "🖼️" },
      { id: "photography", label: "Photography", emoji: "📷" },
      { id: "painting", label: "Painting", emoji: "🎨" },
      { id: "writing", label: "Writing", emoji: "✍️" },
      { id: "reading", label: "Reading", emoji: "📚" },
      { id: "poetry", label: "Poetry", emoji: "📝" },
      { id: "comedy", label: "Comedy", emoji: "😂" },
      { id: "karaoke", label: "Karaoke", emoji: "🎤" },
      { id: "dj", label: "DJing", emoji: "🎧" },
      { id: "live_music", label: "Live music", emoji: "🎸" },
      { id: "opera", label: "Opera", emoji: "🎼" },
    ],
  },
  {
    id: "fitness",
    title: "Fitness & Sports",
    interests: [
      { id: "gym", label: "Gym", emoji: "🏋️" },
      { id: "yoga", label: "Yoga", emoji: "🧘" },
      { id: "running", label: "Running", emoji: "🏃" },
      { id: "swimming", label: "Swimming", emoji: "🏊" },
      { id: "cycling", label: "Cycling", emoji: "🚴" },
      { id: "football", label: "Football", emoji: "⚽" },
      { id: "basketball", label: "Basketball", emoji: "🏀" },
      { id: "tennis", label: "Tennis", emoji: "🎾" },
      { id: "golf", label: "Golf", emoji: "⛳" },
      { id: "boxing", label: "Boxing", emoji: "🥊" },
      { id: "martial_arts", label: "Martial arts", emoji: "🥋" },
      { id: "pilates", label: "Pilates", emoji: "🤸" },
      { id: "crossfit", label: "CrossFit", emoji: "💪" },
      { id: "bodybuilding", label: "Bodybuilding", emoji: "🏆" },
      { id: "dance_fitness", label: "Dance fitness", emoji: "💃" },
    ],
  },
  {
    id: "music",
    title: "Music",
    interests: [
      { id: "pop_music", label: "Pop Music", emoji: "🎵" },
      { id: "hip_hop", label: "Hip Hop", emoji: "🎤" },
      { id: "rnb", label: "R&B", emoji: "🎶" },
      { id: "afrobeats", label: "Afrobeats", emoji: "🥁" },
      { id: "jazz", label: "Jazz", emoji: "🎷" },
      { id: "rock", label: "Rock", emoji: "🎸" },
      { id: "classical", label: "Classical", emoji: "🎻" },
      { id: "electronic", label: "Electronic", emoji: "🎹" },
      { id: "country", label: "Country", emoji: "🤠" },
      { id: "reggae", label: "Reggae", emoji: "🇯🇲" },
      { id: "gospel", label: "Gospel", emoji: "🙏" },
      { id: "indie", label: "Indie", emoji: "🎙️" },
      { id: "latin", label: "Latin", emoji: "💃" },
      { id: "kpop", label: "K-Pop", emoji: "🇰🇷" },
      { id: "soul", label: "Soul", emoji: "❤️" },
    ],
  },
  {
    id: "pets",
    title: "Pets & Animals",
    interests: [
      { id: "dogs", label: "Dogs", emoji: "🐕" },
      { id: "cats", label: "Cats", emoji: "🐈" },
      { id: "birds", label: "Birds", emoji: "🦜" },
      { id: "fish", label: "Fish", emoji: "🐠" },
      { id: "horses", label: "Horses", emoji: "🐴" },
      { id: "rabbits", label: "Rabbits", emoji: "🐰" },
      { id: "reptiles", label: "Reptiles", emoji: "🦎" },
      { id: "hamsters", label: "Hamsters", emoji: "🐹" },
      { id: "wildlife", label: "Wildlife", emoji: "🦁" },
      { id: "animal_rescue", label: "Animal rescue", emoji: "🏥" },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle & Wellness",
    interests: [
      { id: "meditation", label: "Meditation", emoji: "🧘" },
      { id: "skincare", label: "Skincare", emoji: "🧴" },
      { id: "fashion", label: "Fashion", emoji: "👗" },
      { id: "shopping", label: "Shopping", emoji: "🛍️" },
      { id: "interior_design", label: "Interior design", emoji: "🏠" },
      { id: "gardening", label: "Gardening", emoji: "🌱" },
      { id: "self_care", label: "Self care", emoji: "💆" },
      { id: "astrology", label: "Astrology", emoji: "♈" },
      { id: "spirituality", label: "Spirituality", emoji: "✨" },
      { id: "minimalism", label: "Minimalism", emoji: "🪴" },
      { id: "sustainability", label: "Sustainability", emoji: "♻️" },
      { id: "volunteering", label: "Volunteering", emoji: "🤝" },
    ],
  },
  {
    id: "tech",
    title: "Technology & Gaming",
    interests: [
      { id: "gaming", label: "Gaming", emoji: "🎮" },
      { id: "coding", label: "Coding", emoji: "💻" },
      { id: "startups", label: "Startups", emoji: "🚀" },
      { id: "crypto", label: "Crypto", emoji: "₿" },
      { id: "ai", label: "AI", emoji: "🤖" },
      { id: "gadgets", label: "Gadgets", emoji: "📱" },
      { id: "vr", label: "VR/AR", emoji: "🥽" },
      { id: "esports", label: "Esports", emoji: "🏆" },
      { id: "board_games", label: "Board games", emoji: "🎲" },
      { id: "podcasts", label: "Podcasts", emoji: "🎙️" },
    ],
  },
];

const INITIAL_VISIBLE_COUNT = 6;

export const useEditInterestsLogic = ({
  navigation,
}: EditInterestsScreenProps) => {
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const categories = INTEREST_CATEGORIES;

  const toggleInterest = useCallback((interest: Interest) => {
    setSelectedInterests((prev) => {
      const exists = prev.some((i) => i.id === interest.id);
      if (exists) {
        return prev.filter((i) => i.id !== interest.id);
      }
      return [...prev, interest];
    });
  }, []);

  const isSelected = useCallback(
    (interestId: string) => {
      return selectedInterests.some((i) => i.id === interestId);
    },
    [selectedInterests]
  );

  const toggleCategoryExpanded = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const isCategoryExpanded = useCallback(
    (categoryId: string) => {
      return expandedCategories.has(categoryId);
    },
    [expandedCategories]
  );

  const getVisibleInterests = useCallback(
    (category: InterestCategory) => {
      if (isCategoryExpanded(category.id)) {
        return category.interests;
      }
      return category.interests.slice(0, INITIAL_VISIBLE_COUNT);
    },
    [isCategoryExpanded]
  );

  const hasMoreInterests = useCallback((category: InterestCategory) => {
    return category.interests.length > INITIAL_VISIBLE_COUNT;
  }, []);

  return {
    categories,
    selectedInterests,
    toggleInterest,
    isSelected,
    toggleCategoryExpanded,
    isCategoryExpanded,
    getVisibleInterests,
    hasMoreInterests,
  };
};
