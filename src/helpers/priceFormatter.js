export default function priceFormatter(price) {
  return Intl.NumberFormat().format(price);
}
