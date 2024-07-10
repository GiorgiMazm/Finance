import { configureStore } from "@reduxjs/toolkit";
import appSLice from "@/lib/state/appSLice";

const store = configureStore({
  reducer: appSLice,
});

export default store;
