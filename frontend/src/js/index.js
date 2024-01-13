import '../style/Index.css';
const navMobile = document.querySelector('.nav__mobile');
const overlayNav = document.querySelector('.overlay-nav');
const navBtnClose = document.querySelector('.nav__btn__close');
// sliding  mobile nav
const btnMenu = document.querySelector('.btn__menu');
function navMobileClose() {
  navMobile.classList.remove('nav__mobile--active');
  overlayNav.classList.remove('overlay-blur');
}
// overlayNav.addEventListener('click', navMobileClose);
navBtnClose.addEventListener('click', navMobileClose);
btnMenu.addEventListener('click', function () {
  navMobile.classList.toggle('nav__mobile--active');
  overlayNav.classList.toggle('overlay-blur');
});

// // =====home page - "browse by category" functionallity=====
const showMoreButton = document.querySelector('.category__btn');
const hiddenItems = document.querySelectorAll('.category--hidden');
const categoriesContainer = document.querySelector('.categories__container');
console.log(hiddenItems);

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
