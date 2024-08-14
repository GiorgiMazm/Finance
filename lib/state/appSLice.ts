import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Spent } from "@/types/Spent";

export interface initialStateInterface {
  selectedDate: string;
  spending: Spent[];
}

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so add 1

const initialState: initialStateInterface = {
  selectedDate: `${year}-${month}`,
  spending: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSpending: (state, action: PayloadAction<Spent[]>) => {
      state.spending = action.payload;
    },
  },
});

export const { setSelectedDate, setSpending } = appSlice.actions;

export default appSlice.reducer;
