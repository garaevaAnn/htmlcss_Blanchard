(() => {
document.addEventListener("DOMContentLoaded", function () {

const MOBILE_WIDTH = 970;

function getWindowWidth () {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function scrollToContent (link) {
	// if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
	// 	return;
	// }

  const href = link.getAttribute('href').substring(1);
  const scrollTarget = document.getElementById(href);
  const elementPosition = scrollTarget.getBoundingClientRect().top;

  window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
  });
}

function scrollToPainters (btn, isMobile) {
	if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
		return;
	}

  const scrol = btn.getAttribute('data-scrol');
  const scrollTarget = document.getElementById(scrol);
  const elementPosition = scrollTarget.getBoundingClientRect().top;

  window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
  });
}

  //scrollbar
  let simplebars = document.querySelectorAll(".simplebar");

  simplebars.forEach((val) => {
    new SimpleBar(val, {

      autoHide: false,
      scrollbarMaxSize: 28,
    });
  });

  //Swiper
  const swipeTtopwrapper = new Swiper('.top-wrapper__slider', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });



  //Choices
  const selector = document.querySelector(".choices")

  const choices = new Choices(selector, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: ''
  });

  //accordion
  // $( function() {
  //   $( "#accordion" ).accordion({
  //       icons: false,
  //       heightStyle: "content",
  //       collapsible: true,
  //       active: 0
  //     });

  //   } );

  (() => {
    new Accordion(".js-accordion-container", {
      openOnInit: [0]
    });
  })();

  tippy('.js-tooltip', {
    trigger: 'click',
    theme: 'violet',
  });

  // Создание карты.
  ymaps.ready(init);
  function init() {

    var myMap = new ymaps.Map("contact-map", {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');

    var myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.8, 37.8] // координаты точки
      }
    });

    var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/point.svg',
      iconeImageSize: [20, 20],
      iconeImageOffset: [-3, -42]
    })

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myGeoObject);
    myMap.geoObjects.add(myPlacemark);
  };

  //formvalidation
  var inputselector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(inputselector);

  const charMatch = new RegExp('^[а-яА-Я]*$');
  new window.JustValidate ('.contact__form', {
    colorWrong : '#D11616',

    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 30,
            function: (name, value) => {
             return charMatch.test(value)
            }
        },
        tel: {
            required: true,
            function: (name, value) =>  {
              const phone = inputselector.inputmask.unmaskedvalue()
              return Number(phone) && phone.length === 10
            },
        }
    },

    messages: {
      name: 'Недопустимый формат',
      tel: 'Это обязательное поле',
    },

    submitHandler: function(form) {
        let formData = new FormData(form);

        fetch('../mail.php', {
          method: 'POST',
          body: formData
      }).then(() => {
          console.log('Отправлено');
          form.reset();
        })
        .catch(() => console.log('Ошибка'));
      }
});


  // const validation = new JustValidate('.contваываact__form', {
  //   // colorWrong : '#D11616',
  //   // errorLabelStyle: {
  //   //   color: '#D11616',
  //   //   textDecoration: 'underlined',
  //   // },

  // });

  // validation
  //   .addField('#name', [
  //     {
  //       rule: 'required',
  //       errorMessage: 'Укажите ваше имя',
  //     },
  //     {
  //       rule: 'minLength',
  //       value: 3,
  //       errorMessage: "Укажите ваше имя"
  //   },
  //   {
  //     validator: function (value) {
  //       return charMatch.test(value);
  //     },
  //     errorMessage: 'Недопустимый формат',
  //   },
  //   ])
  //   .addField('#phone', [
  //     {
  //       rule: 'required',
  //       errorMessage: 'Укажите ваш телефон',
  //     },
  //     {
  //       validator: function (name, value) {
  //         const phone = inputselector.inputmask.unmaskedvalue()
  //         return Number(phone) && phone.length === 10
  //       },
  //       errorMessage: 'неверно введен номер',
  //     },

  //   ]);

    // catalog
  document.querySelectorAll('.painters-info__link-name').forEach(function (stepBtn) {
    stepBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.painters-info__link-name').forEach(function (stepContent) {
        stepContent.classList.remove('is-open');
      });
      this.classList.add('is-open');

      document.querySelectorAll('.catalog__painter-info').forEach(function (stepContent) {
        stepContent.classList.remove('is-open');
      });
      const activeStep = document.querySelector(`[data-target=${path}]`);
      activeStep.classList.add('is-open');

      scrollToPainters(this, true);
    });
  });

  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        scrollToContent(this);
    });
  });


// document.querySelectorAll('.js-scroll-link-mob').forEach(link => {
//   link.addEventListener('click', function(e) {
//       e.preventDefault();

//       scrollToContent(this, true);
//   });
// });

   document.getElementById("realism").addEventListener("click", (evt) => {
    dropDown(evt);
  });

  document.getElementById("imprissionism").addEventListener("click", (evt) => {
    dropDown(evt);
  });

  document.getElementById("postimprissionism").addEventListener("click", (evt) => {
    dropDown(evt);
  });

  document.getElementById("avangard").addEventListener("click", (evt) => {
    dropDown(evt);
  });

  document.getElementById("futurism").addEventListener("click", (evt) => {
    dropDown(evt);
  });

  document.querySelector(".search-btn--open").addEventListener("click", function () {
    const formfind = document.querySelector(".header__top__search-form");
    formfind.classList.remove("is-closed");
    formfind.classList.add("is-opened");
    this.classList.add("visible-none");

    // for(let i = 0; i < formfind.children.length ; i++)
    // {
    //   formfind.children[i].setAttribute('tabindex', '0');
    // }
  });
  document.querySelector(".search-btn--close").addEventListener("click", function () {
    const formfind = document.querySelector(".header__top__search-form");
    const seachbtn = document.querySelector(".search-btn--open");
    formfind.classList.remove("is-opened");
    formfind.classList.add("is-closed");
    seachbtn.classList.remove("visible-none");

    // for(let i = 0; i < formfind.children.length ; i++)
    // {
    //   formfind.children[i].setAttribute('tabindex', '0');
    // }
  })

  function dropDown(evt) {
    const btn = evt.target.closest(`.header__bottom__item-btn`);
    const path = btn.dataset.path;
    const drop = document.querySelector(`.header__bottom__item-list[data-target="${path}"]`);
    if (drop.classList.contains('is-active')) {
      drop.classList.remove('is-active');
      btn.classList.remove('is-active');
    }
    else {

      let activeElements = document.querySelectorAll(".header__bottom__item-list.is-active , .header__bottom__item-btn.is-active");

      if (activeElements.length) {
        activeElements.forEach((val) => {
          if (val.classList.contains('is-active')) {
            val.classList.remove('is-active');
          }
        });
      };
      drop.classList.add('is-active');
      btn.classList.toggle('is-active');
    }
  }

});


})();
