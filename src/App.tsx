import React, { useEffect } from "react";
import "./App.css";
import {
  getExpenditure,
  expenditureStore,
} from "./features/expenditure/expenditureSlice";
import { toLocalCurrency } from "./helper";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./components/Button";
import { Expenditure } from "./features/expenditure/Expenditure";

function App() {
  const dispatch = useAppDispatch();
  const { currentMonth, totalExpenditureCurrentMonth } =
    useAppSelector(expenditureStore);

  useEffect(() => {
    dispatch(getExpenditure());
  }, []);

  return (
    <div className="p-8">
      <div className="text-center">
        <h1 className="font-semibold text-xl">Diari Jajan {currentMonth}</h1>
        <h2 className="mb-2">
          Pengeluaran Bulan Ini {toLocalCurrency(totalExpenditureCurrentMonth)}
        </h2>
        <Button variant="primary" text="TAMBAH ITEM" />
      </div>
      <Expenditure />
    </div>
  );
}

export default App;
