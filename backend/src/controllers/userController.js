const multer = require('multer');
const sharp = require('sharp');

const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      return next(new AppError('No file of picture was uploaded', 400));
    }

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 40 })
      .withMetadata()
      .toFile(`backend/src/public/assets/users/${req.file.filename}`);
    next();
  } catch (error) {
    next(error); // Pass the error to the next error-handling middleware
  }
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'EngineeringBranch',
    'university',
    'about',
    'contactEmail',
    'github',
    'xaccount',
    'location',
    'yearsOfExperienceInput',
    'availability',
    'skills',
    'languages',
    'workExperience',
    'education',
    'projects',
    'photo'
  );
  //  Handle the 'projects' field update BECAUSE it is a nested arrays
  if (req.body.projects && Array.isArray(req.body.projects)) {
    filteredBody.projects = req.body.projects.map((project) => ({
      projectName: project.projectName,
      projectLink: project.projectLink,
    }));
  }

  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
