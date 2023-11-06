export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check if its a clean dollar amount
  // so then $23.00 will be displayed as $23
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // Intl.NumberFormat is a built in Node.js function for converting currency
  const formatter = new Intl.NumberFormat('en-US', options);
  // we need to also divide it by 100
  return formatter.format(amount / 100);
}
