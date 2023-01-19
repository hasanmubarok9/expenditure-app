import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAppDispatch, useOutsideClick } from "../app/hooks";
import {
  addExpenditure,
  getExpenditure,
} from "../features/expenditure/expenditureSlice";
import Button from "./Button";
import Input from "./Input";

type ModalPropsType = {
  onClickOutside: () => void;
  onClickSubmit: () => void;
  onClickCancel: () => void;
};

function Modal({
  onClickCancel,
  onClickSubmit,
  onClickOutside,
}: ModalPropsType) {
  const dispatch = useAppDispatch();

  const [expenditure, setExpenditure] = useState({
    jam: "",
    tanggal: "",
    nama: "",
    pengeluaraan: 0,
  });

  const handleClickOutside = () => {
    onClickOutside();
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setExpenditure({
      ...expenditure,
      [e.target.id]:
        e.target.id === "pengeluaraan"
          ? parseInt(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const date = new Date();
    const jam = date
      .toLocaleString("id", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(".", ":");
    const tanggal = date.toLocaleString("id", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const res = await dispatch(
      addExpenditure({ ...expenditure, jam, tanggal })
    ).unwrap();
    dispatch(getExpenditure());
    onClickSubmit();
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-600 bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    >
      <div className="flex items-center justify-center h-full">
        <div
          ref={ref}
          className="bg-white rounded-md shadow dark:bg-gray-700 w-full max-w-xs md:max-w-md"
        >
          <p className="p-4 font-medium text-lg">Tambah Entri</p>
          <div className="p-4 pt-0">
            <form action="" onSubmit={handleSubmit}>
              <Input
                label="Nama"
                id="nama"
                type="text"
                required={true}
                className="mb-2"
                handleChange={handleChange}
              />
              <Input
                label="Harga"
                id="pengeluaraan"
                type="number"
                required={true}
                className="mb-4"
                handleChange={handleChange}
              />
              <div className="flex items-center justify-end text-white">
                <Button
                  variant="secondary"
                  text="Batal"
                  className="mr-4"
                  onClick={onClickCancel}
                />
                <Button variant="primary" text="Kirim" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
