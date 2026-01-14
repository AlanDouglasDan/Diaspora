import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Plan } from "@/src/api/plans/types";

interface PlansState {
  data: Plan[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlansState = {
  data: null,
  isLoading: false,
  error: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<Plan[] | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    setPlansLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPlansError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPlans: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setPlans, setPlansLoading, setPlansError, clearPlans } =
  plansSlice.actions;
export default plansSlice.reducer;
