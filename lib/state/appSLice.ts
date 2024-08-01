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
    addSpending: (state, action: PayloadAction<Spent>) => {
      state.spending.push(action.payload);
    },
    setSpending: (state, action: PayloadAction<Spent[]>) => {
      state.spending = action.payload;
    },
    deleteSpending: (state, action: PayloadAction<number>) => {
      state.spending = state.spending.filter(
        (spent) => spent.id !== action.payload,
      );
    },
    editSpending: (
      state,
      action: PayloadAction<{ id: number; updatedSpent: Spent }>,
    ) => {
      const { id, updatedSpent } = action.payload;
      const spendingIndex = state.spending.findIndex(
        (spent) => spent.id === id,
      );
      if (spendingIndex !== -1) {
        state.spending[spendingIndex] = {
          ...state.spending[spendingIndex],
          ...updatedSpent,
        };
      }
    },
  },
});

export const {
  setSelectedDate,
  setSpending,
  addSpending,
  deleteSpending,
  editSpending,
} = appSlice.actions;

export default appSlice.reducer;
