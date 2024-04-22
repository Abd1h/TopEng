const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { link } = require('fs');

const workExperienceSchema = new mongoose.Schema({
  workPlace: {
    type: String,
    required: [true, 'Enter Work place name'],
  },
  workTitle: {
    type: String,
    required: ['true', 'provide your work title'],
  },
  workDescription: {
    type: String,
  },
  workYears: {
    type: String,
    required: [true, 'Enter Work place time period'],
  },
  startYear: {
    type: String,
  },
  endYear: {
    type: String,
  },
});

const educationSchema = new mongoose.Schema({
  educationTitle: {
    type: String,
    required: ['true', 'provide your education title'],
  },
  educationPlace: {
    type: String,
    required: [true, 'Enter Education place name'],
  },
  educationDescription: {
    type: String,
  },
  educationYears: {
    type: String,
    required: [true, 'Enter Education place time period'],
  },
  startYear: {
    type: String,
  },
  endYear: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  EngineeringBranch: {
    type: String,
  },
  workExperience: [workExperienceSchema],
  education: [educationSchema],
  about: {
    type: String,
    maxlength: 500,
  },
  photo: {
    type: String,
    default: 'default',
  },
  // workEmail: {
  //   type: String,
  //   // unique: true,
  //   lowercase: true,
  //   validate: [validator.isEmail, 'Please provide a valid email'],
  // },
  githubAccount: {
    type: String,
  },
  xAccount: {
    type: String,
  },
  yearsOfExperienceInput: {
    type: Number,
  },
  yearsOfExperienceOutput: {
    type: String,
  },
  location: {
    type: String,
  },
  about: {
    type: String,
    maxlength: 500,
  },
  university: {
    type: String,
  },
  availability: {
    type: String,
  },
  skills: [],
  languages: [],
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

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
userSchema.pre('save', function (next) {
  if (this.EngineeringBranch) this.EngineeringBranch = firstLetterCaptilized(this.EngineeringBranch);
  if (this.location) this.location = firstLetterCaptilized(this.location);
  if (this.university) this.university = firstLetterCaptilized(this.university);
  if (this.availability) this.availability = firstLetterCaptilized(this.availability);

  next();
});

userSchema.pre('save', function (next) {
  if (this.skills) this.skills = firstLetterCaptilized(this.skills);
  if (this.languages) this.languages = firstLetterCaptilized(this.languages);
  next();
});

userSchema.pre('save', function (next) {
  if (this.yearsOfExperienceInput) {
    if (this.yearsOfExperienceInput < 1) this.yearsOfExperienceOutput = `${this.yearsOfExperienceInput} year`;
    else {
      this.yearsOfExperienceOutput = `${this.yearsOfExperienceInput} years`;
    }
  }
  next();
});
workExperienceSchema.pre('save', function (next) {
  const years = this.workYears.split('-');
  this.startYear = years[0];
  this.endYear = years[1];
  next();
});
educationSchema.pre('save', function (next) {
  const years = this.educationYears.split('-');
  this.startYear = years[0];
  this.endYear = years[1];
  next();
});
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
