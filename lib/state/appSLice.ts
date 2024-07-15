import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Spent } from "@/types/Spent";

export interface initialStateInterface {
  selectedMonth: number;
  spending: Spent[];
}
const initialState: initialStateInterface = {
  selectedMonth: 7,
  spending: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
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
  setSelectedMonth,
  setSpending,
  addSpending,
  deleteSpending,
  editSpending,
} = appSlice.actions;

export default appSlice.reducer;
