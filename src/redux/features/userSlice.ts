import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuth = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuth = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    SignOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, SignOut } = userSlice.actions;

export default userSlice.reducer;
