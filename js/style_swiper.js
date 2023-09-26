document.querySelectorAll('.swiper').forEach(function (container) {
  new Swiper(container, {
    // Опции Swiper здесь
    slidesPerView: 1, // Количество видимых слайдов
    watchOverflow: true,
    navigation: {
      nextEl: container.querySelector('.swiper-button-next'), // Навигация для конкретного контейнера
      prevEl: container.querySelector('.swiper-button-prev'), // Навигация для конкретного контейнера
    },
    pagination: {
      el: container.querySelector('.swiper-pagination'), // Пагинация для конкретного контейнера
    },
    scrollbar: {
      el: container.querySelector('.swiper-scrollbar'), // Скроллбар для конкретного контейнера
    },
  });
});
