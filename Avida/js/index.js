const city_swiper = new Swiper(".tw-top-cities.poster.swiper", {
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

const discount_swiper = new Swiper(".discounts.poster.swiper", {
    slidesPerView:2,
    freeMode: true,
    spaceBetween: 3,
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
  