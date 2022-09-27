(() => {
  function setBurger(params) {
    const TABLET_WIDTH = 1280;
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = document.querySelectorAll(`.${params.linkClass}`);

    function onBtnClick() {
      this.classList.toggle(params.activeClass);

      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
        this.classList.toggle(params.hiddenClass);
      }
    };

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        btn.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", window.debounce(onBtnClick,500));

    links.forEach(link => {
      link.addEventListener("click", function(){
        if(document.body.offsetWidth <= TABLET_WIDTH) {
          onBtnClick.call(btn); // привязываем кнопку, что бы линк сработал как кнопка закрытия
        }
      })

    });
  }

  // здесь мы вызываем функцию и передаем в нее классы наших элементов
  setBurger({
    btnClass: "burger", // класс бургера
    menuClass: "menu-wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
    linkClass: "top-nav__link"
  });
})();
