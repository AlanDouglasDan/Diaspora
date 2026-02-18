import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  gender: string[];
  activity: string[];
  country: string;
  distanceRange: [number, number];
  ageRange: [number, number];
  hasBio: boolean;
  ethnicity: string[];
  starSign: string[];
  height: string[];
  drinking: string[];
  smoking: string[];
  educationLevel: string[];
  children: string[];
  lookingFor: string[];
  sexuality: string[];
  minPhotos: number;
  religion: string[];
  workoutFrequency: string[];
  personality: string[];
  personalityProfile: string[];
  bodyType: string[];
  language: string[];
  opennessToLongDistance: string[];
  willingToRelocate: string[];
  loveLanguage: string[];
}

export const INITIAL_FILTER_STATE: FilterState = {
  gender: [],
  activity: [],
  country: "all",
  distanceRange: [1, 500],
  ageRange: [18, 99],
  hasBio: false,
  ethnicity: [],
  starSign: [],
  height: [],
  drinking: [],
  smoking: [],
  educationLevel: [],
  children: [],
  lookingFor: [],
  sexuality: [],
  minPhotos: 1,
  religion: [],
  workoutFrequency: [],
  personality: [],
  personalityProfile: [],
  bodyType: [],
  language: [],
  opennessToLongDistance: [],
  willingToRelocate: [],
  loveLanguage: [],
};

interface FiltersStoreState {
  filters: FilterState;
  appliedFilters: FilterState;
}

const initialState: FiltersStoreState = {
  filters: INITIAL_FILTER_STATE,
  appliedFilters: INITIAL_FILTER_STATE,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },
    updateFilter: (
      state,
      action: PayloadAction<{ key: keyof FilterState; value: any }>,
    ) => {
      state.filters[action.payload.key] = action.payload.value as never;
    },
    applyFilters: (state) => {
      state.appliedFilters = state.filters;
    },
    clearFilters: (state) => {
      state.filters = INITIAL_FILTER_STATE;
      state.appliedFilters = INITIAL_FILTER_STATE;
    },
  },
});

export const { setFilters, updateFilter, applyFilters, clearFilters } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
export default filtersReducer;
