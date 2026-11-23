const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get tour data
  const tours = await Tour.find();

  //   Build template

  // Render that template using tour data from 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });

  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
    mapboxToken: process.env.MAPBOX_TOKEN
  });
});
