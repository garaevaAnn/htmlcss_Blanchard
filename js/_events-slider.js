(() => {

let slider = new Swiper(".js-events-slider", {

  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".events__btn-next",
    prevEl: ".events__btn-prev"
  },
  pagination: {
    el: '.events__swiper-pagination'
  },

  breakpoints: {
    610: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },
    970: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27
    },

    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  },

  a11y: false,
  keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

  // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: 'slide-visible',

  on: {
    init: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    }
  }
});

})();
