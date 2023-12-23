import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStart: (state) => {
      state.loading = true;
    },
    setEndLoading: (state) => {
      state.loading = false;
    },
    setUserSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
    setLogout: (state) => {
      state.userInfo = null;
      localStorage.setItem("user", null);
    },
  },
});

export const {
  setUserStart,
  setEndLoading,
  setUserSuccess,
  setUserError,
  setLogout,
} = userReducer.actions;

export default userReducer.reducer;
