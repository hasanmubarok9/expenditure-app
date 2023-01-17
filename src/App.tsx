import React, { useEffect } from "react";
import "./App.css";
import { getExpenditure } from "./features/expenditure/expenditureSlice";
import { useAppDispatch } from "./app/hooks";
import Button from "./components/Button";
import { Expenditure } from "./features/expenditure/Expenditure";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExpenditure());
  }, []);

  return (
    <div className="p-8">
      <div className="text-center">
        <h1 className="font-semibold text-xl">Diari Jajan Februari 2021</h1>
        <h2 className="mb-2">Pengeluaran Bulan Ini Rp.5.605.475</h2>
        <Button variant="primary" text="TAMBAH ITEM" />
      </div>
      <Expenditure />
    </div>
  );
}

export default App;
