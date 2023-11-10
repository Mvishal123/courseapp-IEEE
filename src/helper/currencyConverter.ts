export const currencyConverter = (price: number) => {
  const convertedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return convertedPrice;
};
