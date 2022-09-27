
let projectsSlider = new Swiper(".projects__partners-swiper", {

  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".projects__btn-next",
    prevEl: ".projects__btn-prev"
  },

  breakpoints: {
    610: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },
    970: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50
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
