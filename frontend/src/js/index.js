import "../style/Index.css"

const navBtnClose=document.querySelector('.nav__btn__close')
// sliding  mobile nav
const btnMenu = document.querySelector('.btn__menu');
// const subList=document.querySelector('.nav__sublist');
// const btnAccordion=document.querySelector('.btn__accordion');
	const navMobile = document.querySelector('.nav__mobile');
  
	btnMenu.addEventListener('click', function () {
		navMobile.classList.toggle('nav__mobile--active');
	});
navBtnClose.addEventListener('click',function(){
    navMobile.classList.remove('nav__mobile--active');
})
// accordion element in explore in nav

// btnAccordion.addEventListener("click", function (e) {
//   subList.classList.add('nav__sublist--hidden')
// });
