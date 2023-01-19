import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchExpenditure,
  postExpenditure,
  ExpenditureType,
} from "./expenditureAPI";

type ExpenditureValueType = {
  date: string;
  items: Array<{
    clockTime: string;
    name: string;
    expenditure: number;
  }>;
};

const date = new Date();

export interface ExpenditureState {
  currentMonth: string;
  totalExpenditureCurrentMonth: number;
  value: ExpenditureValueType[];
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

export const addExpenditure = createAsyncThunk(
  "expenditure/addExpenditure",
  async (params: ExpenditureType) => {
    const response = await postExpenditure(params);
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
      // Get total expenditure for current month
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

      // list of expenditures
      const currentMonthData = action.payload.filter(({ tanggal }) => {
        const newDate = new Date(tanggal);
        return (
          newDate.getMonth() === date.getMonth() &&
          newDate.getFullYear() === date.getFullYear()
        );
      });
      const dates = currentMonthData
        .map(({ tanggal }) => tanggal)
        .filter((x, i, a) => a.indexOf(x) === i)
        .sort((a, b) => {
          return new Date(a) > new Date(b) ? -1 : 1;
        });
      state.value = dates.map((date) => ({
        date,
        items: currentMonthData
          .filter(({ tanggal }) => tanggal === date)
          .map(({ jam: clockTime, nama: name, pengeluaraan: expenditure }) => ({
            clockTime,
            name,
            expenditure,
          })),
      }));
    });
    builder.addCase(getExpenditure.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const expenditureStore = (state: RootState) => state.expenditure;

export default expenditureSlice.reducer;
