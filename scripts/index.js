import { bestSellers } from "../data/products.js";
import { addToCart, addToCartPopup, getProductInfo } from "./cart.js";

let slides = document.querySelectorAll(".slide");
let btns = document.querySelectorAll(".img-btn");
let currentSlide = 1;

function manualNavs(interval) {
  slides.forEach((slide) => slide.classList.remove("active"));
  btns.forEach((btn) => btn.classList.remove("active"));

  if (slides[interval] && btns[interval]) {
    slides[interval].classList.add("active");
    btns[interval].classList.add("active");
  }
}

if (btns.length > 0) {
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      manualNavs(i);
      currentSlide = i;
    });
  });
}

if (slides.length > 0) {
  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      manualNavs(i);
      currentSlide = i;
    });
  });
}

function repeat() {
  if (slides.length === 0 || btns.length === 0) return;

  let active = document.getElementsByClassName("active");
  let i = 1;

  function repeater() {
    setTimeout(() => {
      [...active].forEach((activeClass) => {
        activeClass.classList.remove("active");
      });

      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if (i === slides.length) {
        i = 0;
      }

      repeater();
    }, 5000);
  }
  repeater();
}
repeat();

function renderBestSellers() {
  const container = document.querySelector(".products-showcase");
  if (!container) return;

  let bestSellersHTML = "";
  bestSellers.forEach((item) => {
    bestSellersHTML += `
      <div class="product">
        <img
          src="${item.image}"
          alt="A picture of a vintage black bag"
          class="product-img"
        />
        <div class="product-info">
          <p class="product-name">${item.name}</p>
          <p class="product-price">${item.price} EGP</p>
          <div class="product-nav">
            <button class="add-to-cart-btn" data-product-id=${item.id}>add to cart</button>
            <button class="show-info-btn" data-product-id=${item.id}>show info</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = bestSellersHTML;
}
renderBestSellers();

document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    addToCart(productId);
    addToCartPopup();
  });
});

document.querySelectorAll(".show-info-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const container = document.querySelector(".show-info-container");
    const productId = btn.dataset.productId;
    const product = getProductInfo(productId);

    container.innerHTML = `
        <div class="show-info-img-container">
          <div class="sub-imgs-container">
            <img
              src="${product.image}"
              class="sub-img"
            />
            <img
              src="${product.image}"
              class="sub-img"
            />
            <img
              src="${product.image}"
              class="sub-img"
            />
            <img
              src="${product.image}"
              class="sub-img"
            />
          </div>
          <img
            src="${product.modelImage}"
            class="main-img"
          />
        </div>
        <div class="show-info-desc-container">
          <h2 class="show-info-name">${product.name}</h2>
          <h3 class="show-info-price">${product.price} EGP</h3>
          <h3 class="show-info-size">${product.size}</h3>
          <p class="show-info-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            numquam velit quidem, dolor necessitatibus, fugiat iste aliquid
            aliquam laborum possimus veniam? Obcaecati nostrum
          </p>

          <div class="show-info-utils">
            <div class="product-quantity-container">
              <select class="quantity-counter">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <button data-product-id=${product.id} class="show-info-atc-btn">add to cart</button>
          </div>
        </div>
        <button class="exit-btn">X</button>
    `;
    document.getElementById("show-info-container").style.scale = 1;

    document.querySelector(".exit-btn").addEventListener("click", () => {
      document.getElementById("show-info-container").style.scale = 0;
    });

    document
      .querySelector(".show-info-atc-btn")
      .addEventListener("click", (btn) => {
        const quantity = Number(
          container.querySelector(".quantity-counter").value
        );
        const id = btn.target.dataset.productId;

        addToCart(id, quantity);
        addToCartPopup();
      });
  });
});
