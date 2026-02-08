export interface BoostProfilePayload {
  userId: string;
  visibilityBoost: boolean;
}

export interface BoostProfileResponse {
  success: boolean;
  message?: string;
  boostedAt?: string;
}
