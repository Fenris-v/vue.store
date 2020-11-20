export default function numberFormatter(val) {
  if (!Number(val)) {
    return 0;
  }

  return Intl.NumberFormat().format(val);
}
