export const calculateCreditTotal = (
  amount: number,
  stateTax: number,
  dollarPrice: number
): number => {
  const stateTaxRate = 1 + stateTax / 100;
  const iofInternationalTransactions = 5.38 / 100 + 1;

  const dollarAmountWithTax =
    amount * stateTaxRate * iofInternationalTransactions;

  return Math.ceil(dollarAmountWithTax * dollarPrice);
};
