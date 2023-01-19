import { useOutsideClick } from "../hooks/";
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
  const handleClickOutside = () => {
    onClickOutside();
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-600 bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    >
      <div className="flex items-center justify-center h-full">
        <div ref={ref} className="bg-white rounded-md shadow dark:bg-gray-700 w-full max-w-xs md:max-w-md">
          <p className="p-4 font-medium text-lg">Tambah Entri</p>
          <div className="p-4 pt-0">
            <form action="">
              <Input
                label="Nama"
                id="name"
                type="text"
                required={true}
                className="mb-2"
              />
              <Input
                label="Harga"
                id="price"
                type="number"
                required={true}
                className="mb-4"
              />
              <div className="flex items-center justify-end text-white">
                <Button
                  variant="secondary"
                  text="Batal"
                  className="mr-4"
                  onClick={onClickCancel}
                />
                <Button
                  variant="primary"
                  text="Kirim"
                  onClick={onClickSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
