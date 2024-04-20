// // ===========storing selected tags============
// console.log('tewwst javascript search file');
// document.addEventListener('DOMContentLoaded', function () {
//   const selectedTagsByQuestion = {};
//   const answerTags = document.querySelectorAll('.question__tag');

//   // Add click event listener to each answer tag
//   answerTags.forEach(function (tag) {
//     tag.addEventListener('click', function () {
//       // Get the question associated with the tag
//       const questionContainer = tag.closest('.search-question');
//       const questionId = questionContainer.id;

//       // Initialize an array for the question if it doesn't exist
//       selectedTagsByQuestion[questionId] = selectedTagsByQuestion[questionId] || [];

//       // Toggle the 'selected' class when a tag is clicked
//       tag.classList.toggle('question__tag--active');

//       // Add or remove the tag from the selectedTagsByQuestion array
//       const tagValue = tag.innerText.trim();
//       const tagIndex = selectedTagsByQuestion[questionId].indexOf(tagValue);
//       if (tagIndex === -1) {
//         selectedTagsByQuestion[questionId].push(tagValue);
//       } else {
//         selectedTagsByQuestion[questionId].splice(tagIndex, 1);
//       }

//       // Log the selected tags for debugging (you can remove this in production)
//       console.log(selectedTagsByQuestion);
//     });
//   });
// });
