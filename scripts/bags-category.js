import { products } from "../data/products.js";
import { addToCart, addToCartPopup, getProductInfo } from "./cart.js";

const productsContainer = document.querySelector(".products-container");
if (productsContainer) {
  products.forEach((product) => {
    if (product.type === "bag") {
      productsContainer.innerHTML += `
        <div class="product">
          <div class="product-img-container">
            <img
              src="${product.image}"
              alt="A picture of a vintage black bag"
              class="product-img"
            />
          </div>
          <div class="product-info">
            <p class="product-name">${product.name}</p>
            <p class="product-price">${product.price} EGP</p>
            <div class="product-nav">
              <button class="add-to-cart-btn" data-product-id=${product.id}>add to cart</button>
              <button class="show-info-btn" data-product-id=${product.id}>show info</button>
            </div>
          </div>
        </div>
      `;
    }
  });
}

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
        <div class="carousel" data-carousel>
          <button class="carousel-button prev" data-carousel-button="prev">🡸</button>
          <button class="carousel-button next" data-carousel-button="next">🡺</button>
          <ul data-slides>
            <li class="slide" data-active>
              <img src="${product.modelImage}">
            </li>
            <li class="slide">
              <img src="${product.originalImage}">
            </li>
            <li class="slide">
              <img src="${product.image}">
            </li>
          </ul>
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

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-carousel-button]")) {
    const offset = e.target.dataset.carouselButton === "next" ? 1 : -1;
    const slides = e.target
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  }
});
