import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProfileView } from "@/src/api/profileViews/types";

interface ProfileViewsState {
  data: ProfileView[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileViewsState = {
  data: null,
  isLoading: false,
  error: null,
};

const profileViewsSlice = createSlice({
  name: "profileViews",
  initialState,
  reducers: {
    setProfileViews: (state, action: PayloadAction<ProfileView[] | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setProfileViewsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileViewsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfileViews: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setProfileViews,
  setProfileViewsLoading,
  setProfileViewsError,
  clearProfileViews,
} = profileViewsSlice.actions;
export default profileViewsSlice.reducer;
