import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  subscriptionType: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptionType: null,
  isLoading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionType: (state, action: PayloadAction<string | null>) => {
      state.subscriptionType = action.payload;
      state.error = null;
    },
    setSubscriptionLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubscriptionError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSubscription: (state) => {
      state.subscriptionType = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setSubscriptionType,
  setSubscriptionLoading,
  setSubscriptionError,
  clearSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
