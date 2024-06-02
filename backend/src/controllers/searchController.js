const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const viewsController = require('./viewsController');

exports.getSearchResultsAPI = catchAsync(async (req, res, next) => {
  const { selectedTags } = { ...req.body };
  // 1) Check if user selected data
  if (selectedTags == {} || !selectedTags) {
    return next(new AppError('please select options first!', 400));
  }
  // Construct the aggregation pipeline
  const pipeline = [];
  if (selectedTags.engineeringCategoryQuestion && selectedTags.engineeringCategoryQuestion.length > 0) {
    pipeline.push({
      $match: {
        EngineeringBranch: { $in: selectedTags.engineeringCategoryQuestion },
      },
    });
  }
  if (selectedTags.skillsQuestion && selectedTags.skillsQuestion.length > 0) {
    pipeline.push({
      $match: {
        skills: { $in: selectedTags.skillsQuestion },
      },
    });
  }
  if (selectedTags.educationLevelQuestion && selectedTags.educationLevelQuestion.length > 0) {
    pipeline.push({
      $match: {
        'education.educationTitle': { $in: selectedTags.educationLevelQuestion },
      },
    });
  }
  if (selectedTags.experienceQuestion && selectedTags.experienceQuestion.length > 0) {
    pipeline.push({
      $match: {
        yearsOfExperienceInput: { $in: selectedTags.experienceQuestion },
      },
    });
  }
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
  // if (!searchResults) return next(new AppError('An error occurred while searching.', 404));
  // if (searchResults.length == 0) return next(new AppError('Couldnt find any result, please try again', 400));

  res.status(200).json({
    status: 'success',
    results: searchResults.length,
    data: {
      searchResults,
    },
  });

  viewsController.updateSearchResults(searchResults);
});
