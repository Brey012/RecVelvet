export function initializeSlider() {
  let items = document.querySelectorAll(
    ".slider .slider__list .slider__list-item"
  );
  let next = document.getElementById("next");
  let prev = document.getElementById("prev");
  let thumbnails = document.querySelectorAll(".thumbnail .thumbnail__item");

  // Paramaters
  let countItem = items.length;
  let itemActive = 0;

  // Event next button
  next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
      itemActive = 0;
    }
    showSlider();
  };
  // Event prev button
  prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
      itemActive = countItem - 1;
    }
    showSlider();
  };

  let refreshInterval = setInterval(() => {
    next.click();
  }, 5000);

  function showSlider() {
    // Remove class active
    let itemActiveOld = document.querySelector(".slider .slider__list .slider__list-item.active");
    let thumbnailActiveOld = document.querySelector(".thumbnail .thumbnail__item.active");
    itemActiveOld.classList.remove("active");
    thumbnailActiveOld.classList.remove("active");

    // Add class active
    items[itemActive].classList.add("active");
    thumbnails[itemActive].classList.add("active");
    setPositionThumbnail();

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
  }

  function setPositionThumbnail() {
    let thumbnailActive = document.querySelector(".thumbnail .thumbnail__item.active");
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
      thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
  }

    // Event thumbnail
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.onclick = function () {
        itemActive = index;
        showSlider();
      };
    });
}
