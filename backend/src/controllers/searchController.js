const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

exports.getSearchResult = catchAsync(async (req, res, next) => {
  const { selectedTags } = { ...req.body };

  // 1) Check if user selected data
  if (selectedTags == {} || !selectedTags) {
    return next(new AppError('please select options first!', 400));
  }
  console.log('✔ ✔ ✔ ✔ ✔ ❌❌❌❌ ✔ ✔ ✔ ✔ ✔');
  console.log(selectedTags);
  console.log(selectedTags.engineeringCategoryQuestion);
  // Construct the aggregation pipeline
  const pipeline = [
    // Match documents that match all tags in engineeringCategoryQuestion array
    {
      $match: {
        engineeringCategoryQuestion: { $all: selectedTags.engineeringCategoryQuestion },
      },
    },
    // Match documents that match all tags in skillsQuestion array
    {
      $match: {
        skillsQuestion: { $all: selectedTags.skillsQuestion },
      },
    },
    // Match documents that match all tags in educationLevelQuestion array
    {
      $match: {
        educationLevelQuestion: { $all: selectedTags.educationLevelQuestion },
      },
    },
    // Match documents that match all tags in experienceQuestion array
    {
      $match: {
        experienceQuestion: { $all: selectedTags.experienceQuestion },
      },
    },
    // Match documents that match all tags in locationPreferenceQuestion array
    {
      $match: {
        locationPreferenceQuestion: { $all: selectedTags.locationPreferenceQuestion },
      },
    },
  ];

  // Perform the aggregation
  const searchResults = await User.aggregate(pipeline);

  if (!searchResults) return next(new AppError('An error occurred while searching.', 404));

  console.log(searchResults);

  res.status(200).json({
    status: 'success',
    results: searchResults.length,
    data: {
      data: searchResults,
    },
  });
});
