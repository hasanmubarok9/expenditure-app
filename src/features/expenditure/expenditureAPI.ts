type ExpenditureType = {
  jam: string;
  tanggal: string;
  nama: string;
  pengeluaraan: number;
}

export async function fetchExpenditure() {
  const response = await fetch("http://localhost:3000/items");
  const result: ExpenditureType[] = await response.json();
  return result;
}
