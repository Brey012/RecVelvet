let items = document.querySelectorAll(".slider .slider__list .slider__item ");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let thumbnail = document.querySelector(".thumbnail .thumbnail__item");

let countItem = items.length;
let itemActive = 0;

next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

function showSlider() {
  let itemActiveOld = document.querySelector(
    ".slider .slider__list .slider__item.active"
  );
  let thumbnailActiveOld = document.querySelector(
    ".thumbnail .thumbnail__item.active"
  );
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  items[itemActive].classList.add("active");
  thumbnail[itemActive].classList.add("active");
}

thumbnail.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});
