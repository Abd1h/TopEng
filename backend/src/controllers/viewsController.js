const User = require('./../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const searchController = require('./searchController');

exports.home = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('home', {
    title: 'home page',
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
exports.getSignUpForm = (req, res) => {
  res.status(200).render('sign up', {
    title: 'Create new Account',
  });
};
exports.editPortfolio = (req, res) => {
  res.status(200).render('edit portfolio', {
    title: 'edit portfolio',
  });
};
exports.search = catchAsync((req, res) => {
  res.status(200).render('search', {
    title: 'search',
  });
});
// exports.searchResult = catchAsync(async (req, res, next) => {
//   const users1 = factory.getAll(User);
//   console.log(User);
//   console.log(users1);
//   res.status(200).render('search result', {
//     title: 'search result',
//     users: users1,
//   });
// });

//=============================================================================
let searchResults;
exports.updateSearchResults = function (NewResults) {
  searchResults = NewResults;
};

exports.searchResults = catchAsync(async (req, res, next) => {
  // if (searchResults.length == 0) return next(new AppError('Couldnt find any result, please try again', 400));
  // const users1 = factory.getAll(User);
  res.status(200).render('search result', {
    title: 'search result',
    users: searchResults,
  });
  searchResults = {};
});

exports.getUserAndDisplay = catchAsync(async (req, res, next) => {
  //get the ID of the user that has been clicked on
  const id = req.params.id;
  const user = await User.findById(id);

  // error handling
  if (!user) {
    next(new AppError('There is no tour with that name.', 404));
    return res.status(404).render('error', {
      title: 'Something went wrong!',
      msg: ' Something went wrong! Please try again later.',
    });
  }
  // hid edit portfolio btn cuz its for displaying portfolio
  const displayUserWithoutEditing = true;
  res.status(200).render('portfolio', {
    title: 'protfolio',
    user,
    displayUserWithoutEditing,
  });
});
//=============================================================================

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = async (req, res) => {
  res.status(200).render('portfolio', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
