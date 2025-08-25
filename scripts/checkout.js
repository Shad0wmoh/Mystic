import { cart, getProductInfo } from "./cart.js";

export function calculateItemsTotal() {
  let price = 0;

  cart.forEach((cartItem) => {
    const item = getProductInfo(cartItem.id);
    const itemPrice = item.price;
    price += itemPrice;
  });

  return price;
}

export function renderTotal() {
  const priceElement = document.querySelector(".items-price");
  if (!priceElement) return;

  priceElement.innerHTML = `${String(calculateItemsTotal().toFixed(2))} EGP`;

  const taxPriceTxt = document.querySelector(".tax-price");
  const taxPrice = calculateItemsTotal() * 0.14;
  taxPriceTxt.innerHTML = `${String(taxPrice.toFixed(2))} EGP`;

  const totalPrice = taxPrice + calculateItemsTotal();
  document.querySelector(".total-price").innerHTML = `${totalPrice.toFixed(
    2
  )} EGP`;
}
