const swiper = new Swiper(".poster.swiper", {
  slidesPerView: "auto",
  freeMode: true,

  navigation: {
    nextEl: ".next-btn",
    prevEl: ".pre-btn",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 5,
      width: 1000,
    },
  },
});
