import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: "user" | "admin" | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") as "user" | "admin" | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; role: "user" | "admin" }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
