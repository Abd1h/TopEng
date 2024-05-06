/* eslint-disable */
import '@babel/polyfill';
import { main } from './main';
import { login, logout, signUp } from './login';
import { updateSettings } from './updateSettings';
import { search } from './search';
// DOM ELEMENTS
const loginForm = document.querySelector('.form--Log-In');
const signUpForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelectorAll('.logout__btn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const userWorkForm = document.querySelector('.form-user-work');
const userEducationForm = document.querySelector('.form-user-education');
const userPhotoForm = document.querySelector('.form-user-photo');
const userProjectsForm = document.querySelector('.form-user-projects');
const errorWindow = document.querySelector('.error-container');
if (userPhotoForm) {
  userPhotoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const photo = document.getElementById('photo').files[0];

    // const data = { photo };
    const form = new FormData();

    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'picture');
  });
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}
if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('confirmpassword').value;
    signUp(email, password, passwordConfirm, name);
  });
}

if (logOutBtn) {
  //there is two logout buttons (desktop and mobile)
  logOutBtn.forEach((btn) => btn.addEventListener('click', logout));
}
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //   const form = new FormData();
    //   form.append('name', document.getElementById('name').value);
    //   form.append('EngineeringBranch', document.getElementById('engineeringbranch').value);
    //   form.append('university', document.getElementById('university').value);
    //   form.append('about', document.getElementById('about').value);
    //   form.append('github', document.getElementById('github').value);
    //   form.append('xaccount', document.getElementById('xaccount').value);
    //   form.append('location', document.getElementById('location').value);
    //   form.append('yearsofexperienceInput', document.getElementById('yearsofexperience').value);
    //   form.append('availability', document.getElementById('availability').value);
    const skillsa = document.getElementById('skills').value.split(',');
    // Get the <select> element
    const skillsSelect = document.getElementById('skills');
    const selectedOptions = Array.from(skillsSelect.selectedOptions);
    // Extract values from selected options
    const selectedSkills = selectedOptions.map((option) => option.value);

    //   form.append('skills', skills);
    const languagesa = document.getElementById('languages').value.split(',');
    //   form.append('languages', languages);
    // form.append('photo', document.getElementById('photo').files[0]);

    //   for (var pair of form.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    //   }
    const firstLetterCaptilized = (sentence) => {
      if (sentence) {
        let words;

        if (!Array.isArray(sentence)) {
          words = sentence.split(' ');
          for (let i = 0; i < words.length; i++) words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          words = words.join(' ');
        } else {
          words = sentence.join(' ').split(' ');
          for (let i = 0; i < words.length; i++) words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }

        return words;
      }
    };

    const form = {
      name: document.getElementById('name').value,
      EngineeringBranch: document.getElementById('engineeringbranch').value,
      university: firstLetterCaptilized(document.getElementById('university').value),
      about: document.getElementById('about').value,
      github: document.getElementById('github').value,
      xaccount: document.getElementById('xaccount').value,
      location: firstLetterCaptilized(document.getElementById('location').value),
      yearsOfExperienceInput: document.getElementById('yearsofexperience').value,
      availability: firstLetterCaptilized(document.getElementById('availability').value),
      skills: selectedSkills,
      languages: firstLetterCaptilized(languagesa),
    };

    updateSettings(form, 'data');
  });
}

const workOrEducation = function (type = 'work') {
  const container = type === 'work' ? userWorkForm : userEducationForm;
  const experienceContainer = container.querySelectorAll('.experience-container');
  const formEntries = [];
  if (experienceContainer) {
    const workExperienceArray = experienceContainer.forEach((el) => {
      if (type === 'work') {
        formEntries.push({
          workPlace: el.querySelector(`#${type}place`).value,
          workTitle: el.querySelector(`#${type}title`).value,
          workDescription: el.querySelector(`#${type}description`).value,
          workYears: el.querySelector(`#${type}years`).value,
          startYear: el.querySelector(`#${type}years`).value.split('-')[0],
          endYear: el.querySelector(`#${type}years`).value.split('-')[1],
        });
      }
      if (type === 'education') {
        formEntries.push({
          educationPlace: el.querySelector(`#${type}place`).value,
          educationTitle: el.querySelector(`#${type}title`).value,
          educationDescription: el.querySelector(`#${type}description`).value,
          educationYears: el.querySelector(`#${type}years`).value,
          startYear: el.querySelector(`#${type}years`).value.split('-')[0],
          endYear: el.querySelector(`#${type}years`).value.split('-')[1],
        });
      }
      if (type === 'project') {
        // const projects = [];
        document.querySelectorAll('.project__input-group').forEach((project) => {
          const nameValue = project.querySelector('#projectname').value;
          const linkValue = project.querySelector('#projectlink').value;
          formEntries.push({ projectName: nameValue, projectLink: linkValue });
        });
        // formEntries.push({ projects });
        // Now you have an array of project entries (formEntries) that you can send to the database
      }
    });
    if (type === 'work') {
      return { workExperience: [...formEntries] };
    }
    if (type === 'education') {
      return { education: [...formEntries] };
    }
    if (type === 'project') {
      console.log('index', 111, { projects: [...formEntries] });
      return { projects: [...formEntries] };
    }
  }
};
if (userWorkForm) {
  userWorkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = workOrEducation('work');

    updateSettings(form, 'data');
  });
}
if (userEducationForm) {
  userEducationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = workOrEducation('education');

    updateSettings(form, 'data');
  });
}
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('currentpassword').value;
    const password = document.getElementById('newpassword').value;
    const passwordConfirm = document.getElementById('confirmnewpassword').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('currentpassword').value = '';
    document.getElementById('newpassword').value = '';
    document.getElementById('confirmnewpassword').value = '';
  });
if (userProjectsForm) {
  userProjectsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = workOrEducation('project');

    updateSettings(form, 'data');
  });
}
if (userProjectsForm) {
  const addButton = document.querySelector('.add-project');
  const projectContainer = document.querySelector('.project__input-container');
  const maxProjects = 4;
  let projectCount = 0;

  addButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (projectCount >= maxProjects) {
      // Maximum projects reached, disable the add button
      addButton.disabled = true;
      return;
    }
    // Increment project count
    projectCount++;
    if (maxProjects === projectCount) {
      addButton.classList.add('hidden');
    }

    const markup = `
                <div class="section-separator"></div>
                <div class="project__input-group">
                <div class="form__group">
                    <label class="form__label" for="projectname">Project ${projectCount + 1} Name</label>
                    <input class="form__input" type="text" id="projectname" name="projectname" placeholder="e.g weatherAPI">
                </div>
                <div class="form__group">
                    <label class="form__label" for="projectlink">Project ${projectCount + 1} Link</label>
                    <input class="form__input" type="text" id="projectlink" name="projectlink" placeholder="https://wethAPI.com">
                </div>
                </div>
            `;

    projectContainer.insertAdjacentHTML('beforeend', markup);
  });
}

// =======================================
// // =========== SEARCH FUNCTIONALITY storing selected tags============
const searchForm = document.querySelector('.search-questions__container');

if (searchForm) {
  const selectedTagsByQuestion = {};
  const answerTags = document.querySelectorAll('.question__tag');
  const searchBtn = document.querySelectorAll('.search_btn');

  // Function to handle click event on answer tags
  function handleTagClick(tag) {
    return function (e) {
      e.preventDefault();
      const questionContainer = tag.closest('.search-question');
      const questionId = questionContainer.id;

      selectedTagsByQuestion[questionId] = selectedTagsByQuestion[questionId] || [];

      tag.classList.toggle('question__tag--active');

      const tagValue = tag.innerText.trim();
      const tagIndex = selectedTagsByQuestion[questionId].indexOf(tagValue);
      if (tagIndex === -1) {
        selectedTagsByQuestion[questionId].push(tagValue);
      } else {
        selectedTagsByQuestion[questionId].splice(tagIndex, 1);
      }
    };
  }

  // Function to handle click event on search button
  function handleSearchBtnClick(e) {
    e.preventDefault();
    // console.log(selectedTagsByQuestion);
    // call function that do a post request to API with selected tags
    search(selectedTagsByQuestion);
  }

  // Add event listeners to answer tags
  answerTags.forEach(function (tag) {
    tag.addEventListener('click', handleTagClick(tag));
  });

  // Add event listener to search button
  searchBtn.forEach(function (btn) {
    btn.addEventListener('click', handleSearchBtnClick);
  });
}

if (errorWindow) {
  document.getElementById('backButton').addEventListener('click', function () {
    window.history.back();
  });
}

// categroy section events handling
// Select all buttons with the class '.category'
const categoryButtons = document.querySelectorAll('.category');

// Initialize an empty object to store the category titles

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the category title associated with the button
    const categoryTitle = button.querySelector('.category__title').textContent;
    const selectedCategory = { engineeringCategoryQuestion: [categoryTitle] };
    search(selectedCategory);
  });
});

const categoryNavBtns = document.querySelectorAll('.sublist__link');
categoryNavBtns.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the category title associated with the button
    const categoryTitle = button.textContent;
    const selectedCategory = { engineeringCategoryQuestion: [categoryTitle] };
    search(selectedCategory);
  });
});
