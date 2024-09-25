import { Tax } from "../types";

export const calculateTotalTax = (arr: Tax[], income: number) => {
  const totalTax = arr.reduce(
    (acc, tax) => acc + (tax.checked ? tax.procent : 0),
    0
  );
  return ((totalTax * income) / 100).toFixed();
};
