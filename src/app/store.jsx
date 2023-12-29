import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/login/loginSlice";
import globalSpinnerReducer from "../features/globalSpinner/globalSpinnerSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    globalSpinner: globalSpinnerReducer,
  },
});
