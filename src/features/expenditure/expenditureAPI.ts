export async function fetchExpenditure() {
  const response = await fetch("http://localhost:3000/items");
  const result = await response.json();
  return result;
}
