import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "@/src/api/profile/types";

interface ProfileState {
  data: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setProfile, setProfileLoading, setProfileError, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
