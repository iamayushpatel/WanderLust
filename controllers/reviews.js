const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// 1. Reviews Submit Route
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("New Review Saved..!!");
  req.flash("success", "New Review Created..!!"); // Flash Message
  res.redirect(`/listings/${listing._id}`);
};

// 2. Reviews Delete Route
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Delete From Listing
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted..!!"); // Flash Message
  res.redirect(`/listings/${id}`);
};
