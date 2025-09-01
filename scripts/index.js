let slides = document.querySelectorAll(".section-slide");
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

document.querySelectorAll(".shop-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "../bags-category.html";
  });
});
