import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Like } from "@/src/api/likes/types";

interface ReceivedLikesState {
  data: Like[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReceivedLikesState = {
  data: null,
  isLoading: false,
  error: null,
};

const receivedLikesSlice = createSlice({
  name: "receivedLikes",
  initialState,
  reducers: {
    setReceivedLikes: (state, action: PayloadAction<Like[] | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setReceivedLikesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReceivedLikesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearReceivedLikes: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setReceivedLikes,
  setReceivedLikesLoading,
  setReceivedLikesError,
  clearReceivedLikes,
} = receivedLikesSlice.actions;
export default receivedLikesSlice.reducer;
