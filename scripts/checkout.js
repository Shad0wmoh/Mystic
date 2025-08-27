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

  const totalPrice = calculateItemsTotal();
  document.querySelector(".total-price").innerHTML = `${totalPrice.toFixed(
    2
  )} EGP`;
}
