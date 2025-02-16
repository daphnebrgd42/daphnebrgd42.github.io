const swiper = new Swiper(".poster.swiper", {
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
      slidesPerGroup: 2,
      width: 1000,
      spaceBetween: 10,
    },
  },
});
