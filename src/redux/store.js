import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./user/profileSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
