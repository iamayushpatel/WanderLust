const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// 1. Reviews Submit Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// 2. Reviews Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;

// ------------------------------------------------------------------------------------------

// // 1. Coppy all listing path from app.js
// // 2. const express = require("express");
// //    const router = express.Router();
// // 3. Change app.get => router.get
// // 4. Change "/listings/:id/reviews" => "/"
// // 5. Add require data
// // 6. module.exports = router;

// // 1. Reviews Submit Route
// router.post(
//   "/",
//   validateReview,
//   isLoggedIn,
//   wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;
//     Listing.reviews.push(newReview);

//     await newReview.save();
//     await Listing.save();

//     console.log("New Review Saved..!!");
//     req.flash("success", "New Review Created..!!"); // Flash Message
//     res.redirect(`/listings/${Listing._id}`);
//   })
// );

// // 2. Reviews Delete Route
// router.delete(
//   "/reviewId",
//   isLoggedIn,
//   isReviewAuthor,
  // wrapAsync(async (req, res) => {
  //   let { id, reviewId } = req.params;
  //   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Delete From Listing
  //   await Review.findByIdAndDelete(reviewId);
  //   req.flash("success", "Review Deleted..!!"); // Flash Message
  //   res.redirect(`/listings/${Listing._id}`);
  // })
// );

// module.exports = router;
