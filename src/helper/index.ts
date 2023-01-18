export const toLocalCurrency = (num: number) => {
  return new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  }).format(num).slice(0, -3).trim();
};
