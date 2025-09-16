import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localforage from "localforage";
import {
  createMigrate,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { SettingsSlice } from "./slices/settings.slice";
import { UserSlice } from "./slices/user.slice";


const migrations = {
  0: (state: any) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        moodColorCategory: {
          colorPalette: "DEFAULT",
        },
      },
    };
  },
};

const reducerSlices = {
  [SettingsSlice.name]: SettingsSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
}

const persistConfig = {
  key: PERSIST_KEY,
  version: APP_VERSION,
  timeout: 0,
  storage: localforage,
  whitelist: Object.keys(reducerSlices),
  migrate: createMigrate(migrations),
  transforms: [
    encryptTransform({
      secretKey: SECRET_KEY,
      onError: (err) => console.log(err),
    }),
  ],
};

const reducers = combineReducers(reducerSlices);

const reducer = persistReducer<ReturnType<typeof reducers>>(
  persistConfig,
  reducers
);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type IFRootState = ReturnType<typeof store.getState>;
export type IFRootDispatch = ReturnType<typeof store.dispatch>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
