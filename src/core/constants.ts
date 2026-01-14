// Profile field options constants

export const LANGUAGE_OPTIONS = [
  { id: "English", label: "ENGLISH" },
  { id: "Spanish", label: "SPANISH" },
  { id: "French", label: "FRENCH" },
  { id: "Mandarin", label: "MANDARIN" },
  { id: "Hindi", label: "HINDI" },
  { id: "Arabic", label: "ARABIC" },
  { id: "Portuguese", label: "PORTUGUESE" },
  { id: "German", label: "GERMAN" },
  { id: "Japanese", label: "JAPANESE" },
  { id: "Russian", label: "RUSSIAN" },
  { id: "Other", label: "OTHER" },
];

export const EDUCATION_OPTIONS = [
  { label: "High School", value: "High School" },
  { label: "College", value: "College" },
  { label: "Bachelor", value: "Bachelor" },
  { label: "Master", value: "Master" },
  { label: "PhD", value: "PhD" },
];

export const PET_OPTIONS = [
  { id: "Dog lover", label: "DOG LOVER" },
  { id: "Cat lover", label: "CAT LOVER" },
  { id: "Have pets", label: "HAVE PETS" },
  { id: "Want pets", label: "WANT PETS" },
  { id: "No pets", label: "NO PETS" },
  { id: "Allergic to pets", label: "ALLERGIC TO PETS" },
];

export const SMOKING_OPTIONS = [
  { id: "Non-smoker", label: "NON-SMOKER" },
  { id: "Social smoker", label: "SOCIAL SMOKER" },
  { id: "Regular smoker", label: "REGULAR SMOKER" },
  { id: "Trying to quit", label: "TRYING TO QUIT" },
];

export const DRINKING_OPTIONS = [
  { id: "Non-drinker", label: "NON-DRINKER" },
  { id: "Social drinker", label: "SOCIAL DRINKER" },
  { id: "Regular drinker", label: "REGULAR DRINKER" },
];

export const RELIGION_OPTIONS = [
  { id: "Christianity", label: "CHRISTIANITY" },
  { id: "Islam", label: "ISLAM" },
  { id: "Hinduism", label: "HINDUISM" },
  { id: "Buddhism", label: "BUDDHISM" },
  { id: "Judaism", label: "JUDAISM" },
  { id: "Sikhism", label: "SIKHISM" },
  { id: "Agnostic", label: "AGNOSTIC" },
  { id: "Atheist", label: "ATHEIST" },
  { id: "Spiritual", label: "SPIRITUAL" },
  { id: "Other", label: "OTHER" },
  { id: "Prefer not to say", label: "PREFER NOT TO SAY" },
];

export const ZODIAC_OPTIONS = [
  { id: "Aries", label: "ARIES" },
  { id: "Taurus", label: "TAURUS" },
  { id: "Gemini", label: "GEMINI" },
  { id: "Cancer", label: "CANCER" },
  { id: "Leo", label: "LEO" },
  { id: "Virgo", label: "VIRGO" },
  { id: "Libra", label: "LIBRA" },
  { id: "Scorpio", label: "SCORPIO" },
  { id: "Sagittarius", label: "SAGITTARIUS" },
  { id: "Capricorn", label: "CAPRICORN" },
  { id: "Aquarius", label: "AQUARIUS" },
  { id: "Pisces", label: "PISCES" },
  {
    id: "I don't believe in zodiac signs",
    label: "I DON'T BELIEVE IN ZODIAC SIGNS",
  },
];

export const ETHNICITY_OPTIONS = [
  { id: "Asian", label: "ASIAN" },
  { id: "Black/African", label: "BLACK/AFRICAN" },
  { id: "Hispanic/Latino", label: "HISPANIC/LATINO" },
  { id: "Middle-Eastern", label: "MIDDLE-EASTERN" },
  { id: "Native-American", label: "NATIVE-AMERICAN" },
  { id: "Pacific-Islander", label: "PACIFIC-ISLANDER" },
  { id: "White/Caucasian", label: "WHITE/CAUCASIAN" },
  { id: "Mixed", label: "MIXED" },
  { id: "Other", label: "OTHER" },
  { id: "Prefer not to say", label: "PREFER NOT TO SAY" },
];

export const HEIGHT_OPTIONS = [
  { id: "Under 5'0\"", label: "UNDER 5'0\"" },
  { id: "5'0\"-5'3\"", label: "5'0\"-5'3\"" },
  { id: "5'4\"-5'7\"", label: "5'4\"-5'7\"" },
  { id: "5'8\"-5'11\"", label: "5'8\"-5'11\"" },
  { id: "6'0\"-6'3\"", label: "6'0\"-6'3\"" },
  { id: "Over 6'3\"", label: "OVER 6'3\"" },
];

export const FAMILY_PLANS_OPTIONS = [
  { id: "Want children", label: "WANT CHILDREN" },
  { id: "Don't want children", label: "DON'T WANT CHILDREN" },
  { id: "Have children", label: "HAVE CHILDREN" },
  { id: "Open to children", label: "OPEN TO CHILDREN" },
  { id: "Not sure yet", label: "NOT SURE YET" },
];

// Icon to emoji mapping for interests
export const ICON_TO_EMOJI: Record<string, string> = {
  "airplane-outline": "✈️",
  "camera-outline": "📸",
  "color-palette-outline": "🎨",
  "brush-outline": "🖼️",
  "body-outline": "🧘",
  "musical-notes-outline": "🎵",
  "film-outline": "🎬",
  "tennisball-outline": "🎾",
  "football-outline": "⚽",
  "basketball-outline": "🏀",
  "star-outline": "⭐",
  "create-outline": "✏️",
  "beer-outline": "🍺",
  "planet-outline": "🪐",
  "walk-outline": "🚶",
  "game-controller-outline": "🎮",
  "trail-sign-outline": "🥾",
  "footsteps-outline": "👣",
  "boat-outline": "⛵",
  "water-outline": "💧",
  "mic-outline": "🎤",
  "shield-checkmark-outline": "🛡️",
};

// Constants for interests display
export const INITIAL_VISIBLE_COUNT = 20;
