import { useAppSelector } from "../../app/hooks";
import { toLocalCurrency } from "../../helper";
import { expenditureStore } from "./expenditureSlice";

export function Expenditure() {
  const { value: expenditures } = useAppSelector(expenditureStore);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {expenditures.map(({ date, items }, id) => (
        <div className="p-4 shadow-md" key={id}>
          <p className="font-semibold mb-4">{date}</p>
          {items.length > 0 && (
            <ul>
              {items.map(({ clockTime, name, expenditure }, id) => (
                <li className="flex items-center gap-4" key={id}>
                  <p>{clockTime}</p>
                  <p>{name}</p>
                  <p className="ml-auto">{toLocalCurrency(expenditure)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
