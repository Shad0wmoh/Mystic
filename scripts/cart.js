import { products } from "../data/products.js";
import { renderTotal } from "./checkout.js";

export let cart;

cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".cart-items-container");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
        <div class="empty-cart-info">
          <h2 class="empty-cart-txt">Your Cart is Empty</h2>
          <button class="discover-btn">discover more</button>
        </div>  
    `;
  } else {
    renderCartItems();
  }

  const discoverBtn = document.querySelector(".discover-btn");
  if (discoverBtn) {
    discoverBtn.addEventListener("click", () => {
      window.location.href = "../bags-category.html";
    });
  }
});

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCartPopup() {
  const popup = document.querySelector(".js-add-to-cart-popup");
  if (!popup) return;

  popup.classList.remove("add-to-cart-popup-hidden");
  popup.classList.add("add-to-cart-popup-shown");

  setTimeout(() => {
    popup.classList.add("add-to-cart-popup-hidden");
    popup.classList.remove("add-to-cart-popup-shown");
  }, 3000);
}

export function getProductInfo(productId) {
  let matchingItem;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingItem = product;
    }
  });
  return matchingItem;
}

function renderCartItems() {
  let cartHTML = "";
  cart.forEach((cartItem) => {
    let CartItemInfo = getProductInfo(cartItem.id);
    CartItemInfo.quantity = cartItem.quantity;
    cartHTML += `
        <div class="cart-item cart-item-id-${CartItemInfo.id}">
          <div class="item-info">
            <h2 class="item-name">${CartItemInfo.name}</h2>
            <h3 class="item-price">${CartItemInfo.price} EGP</h3>
            <h4 class="item-quantity">Quantity: ${CartItemInfo.quantity}</h4>
            <div class="item-utils">
              <button class="delete-btn" data-product-id=${cartItem.id}>Delete</button>
            </div>
          </div>
          <div class="item-img-container">
            <img class="item-img" src="${CartItemInfo.image}" alt="" />
          </div>
        </div>
    `;
  });

  const container = document.querySelector(".cart-items-container");
  if (!container) return;
  container.innerHTML = cartHTML;
  addDeleteListeners();
}

export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    if (quantity) {
      cart.push({
        id: productId,
        quantity: quantity,
      });
    } else {
      cart.push({
        id: productId,
        quantity: 1,
      });
    }
  }
  updateCartQuantity();
  renderTotal();
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id != productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  updateCartQuantity();
  renderTotal();
  saveToStorage();
}

function addDeleteListeners() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(".cart-items-container");
      if (!container) return;
      if (cart.length === 0) {
        container.innerHTML = `
          <h2 class="empty-cart-txt">Your Cart is Empty</h2>
          <a class="discover-link" href="index.html">Discover More</a>
        `;
        document.location.reload();
      } else {
        renderCartItems();
      }
    });
  });
}

function updateCartQuantity() {
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });

  document.querySelectorAll(".cart-counter").forEach((counter) => {
    counter.innerHTML = String(quantity);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartQuantity();
  renderTotal();
});
