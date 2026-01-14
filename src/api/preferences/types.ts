export interface Preference {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  interests: string[] | null;
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
}

export interface CreatePreferencePayload {
  userId: string;
  lookingToDate: string[];
}

export interface UpdatePreferencePayload {
  interests?: string[];
  lookingToDate?: string[];
  ethnicity?: string;
  pronouns?: string;
  zodiac?: string;
  bio?: string;
  smoking?: boolean;
  drinking?: boolean;
  religion?: string;
  education?: string;
  pets?: string;
  age?: string;
  distance?: string;
  language?: string;
  familyPlans?: string;
  gender?: string;
  height?: string;
}
