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

export interface ExpenditureState {
  value: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: ExpenditureState = {
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
      state.value = action.payload;
    });
    builder.addCase(getExpenditure.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const expenditureStore = (state: RootState) => state.expenditure;

export default expenditureSlice.reducer;
