const swiper = new Swiper(".merchants-container.swiper", {
  autoplay: false,
  loop: true,
  pagination: {
    el: ".dots-list",
    bulletClass: "bullet",
    bulletActiveClass: "bullet-active",
    clickable: true,
  },
});
