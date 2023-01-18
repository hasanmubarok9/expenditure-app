import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getExpenditure, expenditureStore } from "./expenditureSlice";

export function Expenditure() {
  const { value: expenditures, status } = useAppSelector(expenditureStore);
  return (
    <div className="grid grid-cols-4 gap-4">
      {expenditures.map(({ date, items }, id) => (
        <div className="p-4 shadow-md" key={id}>
          <p>{date}</p>
          {expenditures.length > 0 && (
            <ul>
              {expenditures.map(
                ({ jam: hour, nama: name, pengeluaraan: expenditure }, id) => (
                  <li className="flex items-center" key={id}>
                    <p>{hour}</p>
                    <p>{name}</p>
                    <p>{expenditure}</p>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
