export const calculateMoneyTotal = (
  amount: number,
  stateTax: number,
  dollarPrice: number
): number => {
  const dollarAmountWithTax = amount * (1 + stateTax / 100);
  const iof = 1.1 / 100 + 1;

  const dollarRateWithIof = dollarPrice * iof;

  return Math.ceil(dollarAmountWithTax * dollarRateWithIof);
};
