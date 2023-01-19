export type ExpenditureType = {
  jam: string;
  tanggal: string;
  nama: string;
  pengeluaraan: number;
};

export async function fetchExpenditure() {
  const response = await fetch("http://localhost:3000/items");
  const result: ExpenditureType[] = await response.json();
  return result;
}

export async function postExpenditure({
  jam,
  tanggal,
  nama,
  pengeluaraan,
}: ExpenditureType) {
  const response = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      jam,
      tanggal,
      nama,
      pengeluaraan,
    }),
  });
  const result = await response.json();
  return result;
}
