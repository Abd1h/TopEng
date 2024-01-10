import "../style/Index.css"
const navMobile = document.querySelector('.nav__mobile');
const overlayNav=document.querySelector('.overlay-nav')
const navBtnClose=document.querySelector('.nav__btn__close')
// sliding  mobile nav
const btnMenu = document.querySelector('.btn__menu');
function navMobileClose(){
	navMobile.classList.remove('nav__mobile--active');
	overlayNav.classList.remove('overlay-blur')
}
overlayNav.addEventListener('click',navMobileClose)
navBtnClose.addEventListener('click',navMobileClose)
btnMenu.addEventListener('click', function () {
		navMobile.classList.toggle('nav__mobile--active');
		overlayNav.classList.toggle('overlay-blur')
	});

