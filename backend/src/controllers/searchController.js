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

  console.log(selectedTags);

  // Construct the aggregation pipeline
  const pipeline = [];

  // Match documents that match all tags in engineeringCategoryQuestion array
  if (selectedTags.engineeringCategoryQuestion && selectedTags.engineeringCategoryQuestion.length > 0) {
    pipeline.push({
      $match: {
        EngineeringBranch: { $in: selectedTags.engineeringCategoryQuestion },
      },
    });
  }
  console.log(1, pipeline);
  // Match documents that match all tags in skillsQuestion array
  if (selectedTags.skillsQuestion && selectedTags.skillsQuestion.length > 0) {
    pipeline.push({
      $match: {
        skills: { $in: selectedTags.skillsQuestion },
      },
    });
  }

  // Match documents that match all tags in educationLevelQuestion array
  if (selectedTags.educationLevelQuestion && selectedTags.educationLevelQuestion.length > 0) {
    pipeline.push({
      $match: {
        'education.educationTitle': { $in: selectedTags.educationLevelQuestion },
      },
    });
  }
  console.log(2, pipeline);
  // Match documents that match all tags in experienceQuestion array
  if (selectedTags.experienceQuestion && selectedTags.experienceQuestion.length > 0) {
    pipeline.push({
      $match: {
        yearsOfExperienceInput: { $in: selectedTags.experienceQuestion },
      },
    });
  }

  // Match documents that match all tags in locationPreferenceQuestion array
  if (selectedTags.locationPreferenceQuestion && selectedTags.locationPreferenceQuestion.length > 0) {
    pipeline.push({
      $match: {
        location: { $in: selectedTags.locationPreferenceQuestion },
      },
    });
  }

  // Perform the aggregation
  const searchResults = await User.aggregate(pipeline);

  // const searchResults = await User.find();
  if (!searchResults) return next(new AppError('An error occurred while searching.', 404));

  console.log('---000---', searchResults);

  res.status(200).json({
    status: 'success',
    results: searchResults.length,
    data: {
      data: searchResults,
    },
  });
});
