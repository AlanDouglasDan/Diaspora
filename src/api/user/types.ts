export interface User {
  id: string;
  clerkId: string;
  email?: string;
  phone?: string;
  displayName?: string;
  birthday?: string;
  gender?: string;
  showGender?: boolean;
  lookingToDate?: string;
  interests?: string[];
  photos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  clerkId: string;
  phone: string;
}

export interface UpdateUserPayload {
  displayName?: string;
  email?: string;
  userId?: string;
  birthday?: string;
  gender?: string;
  showGender?: boolean;
  lookingToDate?: string;
  interests?: string[];
  photos?: string[];
}

export interface UserListImage {
  imageUrl: string;
  order: number;
}

export interface UserListItem {
  id: string;
  displayName: string;
  email: string;
  gender: string | null;
  birthday: string;
  verified: boolean;
  showGender: boolean;
  lastLogin: string | null;
  subscriptionType: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  fcmToken: string | null;
  streamToken: string;
  onlineStatus: boolean;
  images: UserListImage[];
  distanceKm: number;
  travelTimeMinutes?: number;
  countryAbbreviation?: string;
  country?: {
    name: string;
    abrv: string;
    flag: string;
  };
  boostedVisibilityScore?: number;
  preferences?: {
    id: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
    interests: string[];
    lookingToDate: string[];
    ethnicity: string;
    pronouns: string;
    zodiac: string;
    bio: string;
    smoking: boolean;
    drinking: boolean;
    religion: string;
    education: string;
    pets: string;
    age: string;
    distance: string;
    language: string;
    familyPlans: string;
    gender: string;
    height: string;
    hasBio: boolean;
    minNumberOfPhotos: string;
    connections: string;
  };
  profile?: {
    id: string;
    userId: string;
    bio: string;
    interests: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetUsersResponse {
  users: UserListItem[];
}
