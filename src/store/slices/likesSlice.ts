import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Like } from "@/src/api/likes/types";

interface LikesState {
  data: Like[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LikesState = {
  data: null,
  isLoading: false,
  error: null,
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<Like[] | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setLikesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLikesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearLikes: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setLikes, setLikesLoading, setLikesError, clearLikes } =
  likesSlice.actions;
export default likesSlice.reducer;
