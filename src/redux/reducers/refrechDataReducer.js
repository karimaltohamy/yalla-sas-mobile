import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refrechData: JSON.parse(localStorage.getItem("refrechData")) || null,
  error: null,
  loading: null,
};

const refrechDataReducer = createSlice({
  name: "refrechData",
  initialState: initialState,
  reducers: {
    setRefrechDataStart: (state) => {
      state.loading = true;
    },
    setRefrechDataSuccessfull: (state, action) => {
      state.loading = false;
      state.refrechData = action.payload;
      localStorage.setItem("refrechData", JSON.stringify(action.payload));
    },
    setRefrechDataSuccessError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setRefrechDataStart,

  setRefrechDataSuccessfull,
  setRefrechDataSuccessError,
} = refrechDataReducer.actions;

export default refrechDataReducer.reducer;
