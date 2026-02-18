import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import {
  userReducer,
  profileReducer,
  plansReducer,
  likesReducer,
  receivedLikesReducer,
  profileViewsReducer,
  preferencesReducer,
  matchesReducer,
  filtersReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    plans: plansReducer,
    likes: likesReducer,
    receivedLikes: receivedLikesReducer,
    profileViews: profileViewsReducer,
    preferences: preferencesReducer,
    matches: matchesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./slices";
