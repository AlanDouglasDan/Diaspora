export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
}

export interface ProfilePreferences {
  id: number;
  lookingFor: string[];
  zodiac: string;
  religion: string;
  education: string;
  age: string;
  minNumberOfPhotos: string;
  hasBio: boolean;
  ethnicity: string;
  height: string;
  connections: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
  user: ProfileUser;
  preferences: ProfilePreferences;
  images: string[];
}

export interface CreateProfilePayload {
  userId: string;
  bio?: string;
  interests?: string[];
}

export interface UpdateProfilePayload {
  bio?: string;
  interests?: string[];
  pets?: string;
}
