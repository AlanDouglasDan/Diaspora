import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Preference } from "@/src/api/preferences/types";

interface PreferencesState {
  data: Preference | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  data: null,
  isLoading: false,
  error: null,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Preference | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setPreferencesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPreferencesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPreferences: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPreferences,
  setPreferencesLoading,
  setPreferencesError,
  clearPreferences,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
