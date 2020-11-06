export default function priceFormatter(price) {
  if (!Number(price)) {
    return 0;
  }

  return Intl.NumberFormat().format(price);
}
