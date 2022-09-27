(() => {
const btns = document.querySelectorAll('.js-open-modal');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const btnClose = document.querySelector('.modal__btn-close') ;

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
    document.body.style.overflow = 'hidden';
	});
});

modalOverlay.addEventListener('click', (e) => {
	if (e.target == modalOverlay) {
    closeModal();
	}
});

btnClose.addEventListener('click', () => {
  closeModal();

});

function closeModal()
{
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
  document.body.removeAttribute('style');
}

})();
