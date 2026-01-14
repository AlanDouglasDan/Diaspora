import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TItsAMatch } from "@/src/api/match/types";

interface MatchesState {
  data: TItsAMatch[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  data: null,
  isLoading: false,
  error: null,
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<TItsAMatch[] | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setMatchesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMatchesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMatches: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setMatches, setMatchesLoading, setMatchesError, clearMatches } =
  matchesSlice.actions;
export default matchesSlice.reducer;
