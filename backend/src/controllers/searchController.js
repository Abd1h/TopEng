const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

exports.getSearchResult = catchAsync(async (req, res, next) => {
  const selectedTags = req.body;
  console.log(1000000000);
  console.log('searchController', selectedTags);

  // 1) Check if user selected data
  if (!selectedTags) {
    return next(new AppError('please select options first!', 400));
  }
});
