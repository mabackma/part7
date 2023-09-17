import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userChange(state, action) {
      return action.payload;
    },
  },
});

export const { userChange } = userSlice.actions;
export default userSlice.reducer;
