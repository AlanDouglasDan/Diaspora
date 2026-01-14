export interface TItsAMatch {
  images: string[];
  location: {
    countryAbbreviation: string;
    id: number;
    lastUpdated: string;
    latitude: string;
    longitude: string;
    userId: string;
  };
  match: {
    matchedAt: string;
    status: string;
    user1Id: string;
    user2Id: string;
  };
  user: {
    birthday: string;
    createdAt: string;
    displayName: string;
    email: string;
    fcmToken: string | null;
    gender: string;
    id: string;
    lastLogin: string | null;
    phone: string;
    showGender: boolean;
    streamToken: string | null;
    subscriptionType: string;
    updatedAt: string;
    verified: boolean;
  };
  userActivity: {
    lastActive: string;
    onlineStatus: boolean;
    userId: string;
  };
}
