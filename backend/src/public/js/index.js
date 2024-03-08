/* eslint-disable */
import '@babel/polyfill';
import { main } from './main';
import { login, logout, signUp } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--Log-In');
const signUpForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.logout__btn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const userWorkForm = document.querySelector('.form-user-work');
const userEducationForm = document.querySelector('.form-user-education');
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
if (logOutBtn) logOutBtn.addEventListener('click', logout);

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
    //   form.append('skills', skills);
    const languagesa = document.getElementById('languages').value.split(',');
    //   form.append('languages', languages);
    // form.append('photo', document.getElementById('photo').files[0]);

    //   for (var pair of form.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    //   }
    const firstLetterCaptilized = (sentence) => {
      let words;
      // if the recieved data is a sentence or array
      if (!Array.isArray(sentence)) {
        words = sentence.split(' ');
      } else words = sentence.join(' ').split(' ');
      // console.log(words);
      for (let i = 0; i < words.length; i++) words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      return words.join(' ');
    };
    const form = {
      name: document.getElementById('name').value,
      EngineeringBranch: firstLetterCaptilized(document.getElementById('engineeringbranch').value),
      university: firstLetterCaptilized(document.getElementById('university').value),
      about: document.getElementById('about').value,
      github: document.getElementById('github').value,
      xaccount: document.getElementById('xaccount').value,
      location: firstLetterCaptilized(document.getElementById('location').value),
      yearsofexperienceInput: document.getElementById('yearsofexperience').value,
      availability: firstLetterCaptilized(document.getElementById('availability').value),
      skills: firstLetterCaptilized(skillsa),
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
    });
    if (type === 'work') {
      return { workExperience: [...formEntries] };
    }
    if (type === 'education') {
      return { education: [...formEntries] };
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
