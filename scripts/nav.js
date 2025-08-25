const navBtn = document.querySelector(".responsive-nav-util");
const navMenu = document.getElementById("rep-nav-menu");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("press-change");

  if (navBtn.classList.contains("press-change")) {
    navMenu.style.display = "block";
  } else {
    navMenu.style.display = "none";
  }
});
