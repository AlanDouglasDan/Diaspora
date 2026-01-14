export interface RouletteSession {
  id: string;
  userId: string;
  status: "waiting" | "completed" | "matched";
  interests: null;
  createdAt: string;
  updatedAt: string;
  previousPartners: string[];
  statusMessage: string;
}

export interface RouletteMatch {
  id: string;
  roomId: string;
  startedAt: string;
  scheduledEndTime: string;
  timeRemaining: number;
  progress: number;
  timeRemainingFormatted: string;
  partnerId: string;
  partner: {
    id: string;
    displayName: string;
  };
}

export interface RouletteStatusResponse {
  success: boolean;
  exists: boolean;
  session: RouletteSession;
  match: RouletteMatch | null;
}

export interface RouletteDetailsResponse {
  success: boolean;
  exists: boolean;
  session: RouletteSession;
  match: RouletteMatch | null;
}

export interface StartRouletteResponse {
  success: boolean;
  matched: boolean;
  message: string;
//   roomId?: string;
//   partnerId?: string;
//   userId?: string;
//   matchId?: string;
//   endsAt?: Date;
}

export interface EndRouletteResponse {
  success: boolean;
  message: string;
}
