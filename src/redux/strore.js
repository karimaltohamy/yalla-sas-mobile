import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import refrechDataReducer from "./reducers/refrechDataReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    refrechData: refrechDataReducer,
  },
});

export default store;
