import { configureStore } from "@reduxjs/toolkit";
import combinedReducer from "./combinedReducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default || storageModule;
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const persistedReducer = persistReducer(
    persistConfig,
    combinedReducer
)

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);


// without persist
// export const store = configureStore({
//     reducer: combinedReducer
// })