import '../../../../frontend/src/style/Index.css';
const navMobile = document.querySelector('.nav__mobile');
const overlayNav = document.querySelector('.overlay');
const navBtnClose = document.querySelector('.nav__btn__close');
const portfolioContainer = document.querySelector('.portfolio-container');
const btnAddExperience = document.querySelectorAll('.add-experience');
const educationContainer = document.querySelector('.education');
const workExperienceContainer = document.querySelector('.workexperience');
// sliding  mobile nav
const btnMenu = document.querySelector('.btn__menu');
function navMobileClose() {
  navMobile.classList.remove('nav__mobile--active');
  overlayNav.classList.remove('overlay-blur');
  overlayNav.classList.add('overlay-nav');
}
overlayNav.addEventListener('click', navMobileClose);
navBtnClose.addEventListener('click', navMobileClose);
btnMenu.addEventListener('click', function () {
  navMobile.classList.toggle('nav__mobile--active');
  overlayNav.classList.toggle('overlay-blur');
  overlayNav.classList.remove('overlay-nav');
});

// adding education/work experience when clicking plus button
function workOrEducation(type) {
  if (type === 'work') return `work`;
  if (type === 'education') return `education`;
  else return 'eror';
}
function AddEducationOrWork(type = 'work') {
  // console.log(type);
  return `<div class="margin-left experience-container ">
                
                <div class="form__group "> 
                    <label class="form__label"for="${type}title">${workOrEducation(type)} Title</label>
                    <input class="form__input"id="${type}title" type="${workOrEducation(type)}title" placeholder="${
                      type === 'work' ? 'Senior Developer' : 'High school diploma'
                    }" >
                </div>
                <div class="form__group "> 
                    <label class="form__label " for="${type}place">${workOrEducation(type)} Place</label>
                    <input class="form__input" id="${type}place" type="${workOrEducation(type)}place" placeholder="${
                      type === 'work' ? 'e.g Asiacell Telecome' : 'Baghdad College'
                    }" >
                </div>
                <div class="form__group "> 
                    <label class="form__label " for="${type}description">${workOrEducation(type)} Description</label>
                    <input class="form__input" id="${type}description" type="${type}description"  >
                </div>
                <div class="form__group "> 
                    <label class="form__label" for="${type}years">${workOrEducation(type)} Years</label>
                    <input class="form__input" id="${type}years" type="${type}years" placeholder="${
                      type === 'work' ? 'e.g 2020 - present' : 'e.g 2016 - 2020'
                    }">
                </div>
                    <div class="remove-experience-container">
                        <h4>Remove ${type === 'work' ? 'Work Experience' : 'Education'}</h4>
                    </div>
                </div>`;
}
if (btnAddExperience) {
  btnAddExperience.forEach((button) => {
    button.addEventListener('click', function (e) {
      const type = button.closest('.form').classList[2];

      button
        .closest('.form')
        .querySelector('.btn-container')
        .insertAdjacentHTML('beforebegin', AddEducationOrWork(type));
    });
  });
}
if (portfolioContainer) {
  portfolioContainer.addEventListener('click', function (e) {
    const target = e.target.closest('.remove-experience-container');
    if (target) {
      target.closest('.experience-container').remove();
    }
  });
}
const showMoreButton = document.querySelector('.category__btn');
const hiddenItems = document.querySelectorAll('.category--hidden');
const categoriesContainer = document.querySelector('.categories__container');
// console.log(hiddenItems);

// Showing all hidden categories
const showCategories = function () {
  // Loop through hidden items and show them
  hiddenItems.forEach(function (item) {
    item.classList.remove('category--hidden');
  });
  // Hide the "Show More" button
  showMoreButton.style.display = 'none';
};

// Check the screen width
const screenWidth = window.innerWidth;
if (showMoreButton) {
  if (screenWidth < 768) {
    showMoreButton.addEventListener('click', showCategories);
  } else {
    // Hide the "Show More" button
    showMoreButton.style.display = 'none';
    // show all categories and change grid template
    showCategories();
    categoriesContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  }
}
// =====search page - "question tags" functionallity=====

document.addEventListener('DOMContentLoaded', function () {
  // Store selected tags for each question
  const selectedTagsByQuestion = {};

  // Get all answer tags
  const answerTags = document.querySelectorAll('.question__tag');

  // Add click event listener to each answer tag
  answerTags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      // Get the question associated with the tag
      const questionContainer = tag.closest('.search-question');
      const questionId = questionContainer.id;

      // Initialize an array for the question if it doesn't exist
      selectedTagsByQuestion[questionId] = selectedTagsByQuestion[questionId] || [];

      // Toggle the 'selected' class when a tag is clicked
      tag.classList.toggle('question__tag--active');

      // Add or remove the tag from the selectedTagsByQuestion array
      const tagValue = tag.innerText.trim();
      const tagIndex = selectedTagsByQuestion[questionId].indexOf(tagValue);
      if (tagIndex === -1) {
        selectedTagsByQuestion[questionId].push(tagValue);
      } else {
        selectedTagsByQuestion[questionId].splice(tagIndex, 1);
      }

      // Log the selected tags for debugging (you can remove this in production)
      console.log(selectedTagsByQuestion);
    });
  });
});
