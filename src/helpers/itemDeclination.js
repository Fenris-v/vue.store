export default function itemDeclination(amount) {
  if (!Number(amount)) {
    return 'Произошла ошибка';
  }

  if (amount % 10 === 0
    || (amount % 10 >= 5 && amount % 10 <= 9)
    || (amount % 100 >= 11 && amount % 100 <= 19)) {
    return `${amount} товаров`;
  }

  if (amount % 10 === 1) {
    return `${amount} товар`;
  }

  return `${amount} товара`;
}
