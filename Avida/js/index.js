const city_swiper = new Swiper(".tw-top-cities.swiper", {
  slidesPerView: "auto",
  freeMode: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".pre-btn",
  },
  breakpoints: {
    992: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      width: 1000,
      spaceBetween: 10,
    },
  },
});

const discount_swiper = new Swiper(".discounts.swiper", {
  slidesPerView: 1,
  freeMode: true,
  width: 350,
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".pre-btn",
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      width: 1000,
      spaceBetween: 3,
    },
  },
});

const recommendCarousel = new Swiper(".hotels.swiper", {
  slidesPerView: 1,
  width: 300,
  breakpoints: {
    992: {
      slidesPerView: 4,
      width: 1000,
    },
  },
});
