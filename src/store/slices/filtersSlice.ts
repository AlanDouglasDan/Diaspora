import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FILTERS_STORAGE_KEY = "@diaspora_applied_filters";

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
  interests: string[];
}

export const INITIAL_FILTER_STATE: FilterState = {
  gender: [],
  activity: [],
  country: "all",
  distanceRange: [0, 100],
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
  interests: [],
};

interface FiltersStoreState {
  filters: FilterState;
  appliedFilters: FilterState;
  isHydrated: boolean;
}

const initialState: FiltersStoreState = {
  filters: INITIAL_FILTER_STATE,
  appliedFilters: INITIAL_FILTER_STATE,
  isHydrated: false,
};

export const hydrateFilters = createAsyncThunk("filters/hydrate", async () => {
  try {
    const stored = await AsyncStorage.getItem(FILTERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as FilterState;
    }
  } catch (error) {
    console.error("Error loading filters from storage:", error);
  }
  return null;
});

const persistFilters = (filters: FilterState) => {
  AsyncStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters)).catch(
    (error) => console.error("Error saving filters to storage:", error),
  );
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
      persistFilters(state.filters);
    },
    clearFilters: (state) => {
      state.filters = INITIAL_FILTER_STATE;
      state.appliedFilters = INITIAL_FILTER_STATE;
      AsyncStorage.removeItem(FILTERS_STORAGE_KEY).catch(() => {});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateFilters.fulfilled, (state, action) => {
      if (action.payload) {
        state.filters = { ...INITIAL_FILTER_STATE, ...action.payload };
        state.appliedFilters = { ...INITIAL_FILTER_STATE, ...action.payload };
      }
      state.isHydrated = true;
    });
    builder.addCase(hydrateFilters.rejected, (state) => {
      state.isHydrated = true;
    });
  },
});

export const { setFilters, updateFilter, applyFilters, clearFilters } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
export default filtersReducer;
