var mySwiper = new Swiper('.swiper', {
  // Опции Swiper здесь
  slidesPerView: 1, // Количество видимых слайдов
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
