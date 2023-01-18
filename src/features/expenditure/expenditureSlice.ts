import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchExpenditure } from "./expenditureAPI";

// type ExpenditureType = {
//   date: string;
//   items: Array<{
//     hour: string;
//     name: string;
//     expenditure: string;
//   }>;
// };

const date = new Date();

export interface ExpenditureState {
  currentMonth: string;
  totalExpenditureCurrentMonth: number;
  value: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: ExpenditureState = {
  currentMonth: date.toLocaleString("id", { month: "long", year: "numeric" }),
  totalExpenditureCurrentMonth: 10000,
  value: [],
  status: "idle",
};

export const getExpenditure = createAsyncThunk(
  "expenditure/getExpenditure",
  async () => {
    const response = await fetchExpenditure();
    return response;
  }
);

export const expenditureSlice = createSlice({
  name: "expenditure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenditure.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getExpenditure.fulfilled, (state, action) => {
      const total = action.payload
        .filter(({ tanggal }) => {
          const newDate = new Date(tanggal);
          return (
            newDate.getMonth() === date.getMonth() &&
            newDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((acc, cur) => acc + cur.pengeluaraan, 0);
      state.totalExpenditureCurrentMonth = total;
      state.value = action.payload;
    });
    builder.addCase(getExpenditure.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const expenditureStore = (state: RootState) => state.expenditure;

export default expenditureSlice.reducer;
