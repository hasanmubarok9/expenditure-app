import { useEffect, useState } from "react";
import "./App.css";
import {
  getExpenditure,
  expenditureStore,
} from "./features/expenditure/expenditureSlice";
import { toLocalCurrency } from "./helper";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./components/Button";
import { Expenditure } from "./features/expenditure/Expenditure";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Button
          variant="primary"
          text="TAMBAH ITEM"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Expenditure />
      {isModalOpen && (
        <Modal
          onClickOutside={() => setIsModalOpen(false)}
          onClickCancel={() => setIsModalOpen(false)}
          onClickSubmit={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
