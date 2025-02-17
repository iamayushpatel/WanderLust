const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // .. give access from perent folder
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// Multer :-
// npm i multer
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

// Cloudinary :-
// Cloudinary provides cloud-based image and video management services.

// Dotenv :-
// npm i dotenv
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

// Cloudinary Node SDK :-
// npm i cloudinary
// The Cloudinary Node SDK allows you to quickly and easily integrate your application with Cloudinary. Effortlessly optimize, transform, upload and manage your cloud's assets.

// Multer Storage Cloudinary :-
// npm i multer-storage-cloudinary
// A multer storage engine for Cloudinary. Also consult the Cloudinary API.

router
  .route("/")
  .get(wrapAsync(listingController.index)) // 1. Index Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing) // 4. Create Route
  );

router.get("/new", isLoggedIn, listingController.renderNewForm); // 3. New Route

router.get("/filter/:q", wrapAsync(listingController.filterListings)); // Filter

router.get("/search", wrapAsync(listingController.search)); // Search

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // 2. Show Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing) // 6. Update Route
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // 7. Delete Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing) // 5. Edit Route
);

module.exports = router;

// ------------------------------------------------------------------------------------------

// // 1. Coppy all listing path from app.js
// // 2. const express = require("express");
// //    const router = express.Router();
// // 3. Change app.get => router.get
// // 4. Change "/listings" => "/"
// // 5. Add require data
// // 6. module.exports = router;

// // // 1. Index Route
// // app.get("/listings", async (req, res) => {
// //   const allListings = await Listing.find({});
// //   res.render("listings/index.ejs", { allListings });
// // });

// // 1. Index Route
// router.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//   })
// );

// // 3. New Route
// router.get("/new", isLoggedIn, (req, res) => {
//   res.render("listings/new.ejs");
// });

// // 2. Show Route
// router.get(
//   "/:id",
// wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate({ path: "reviews", populate: { path: "author" } })
//     .populate("owner");
//   // populate("reviews") : Give Object Data Of Reviews, // populate("owner") : Give Object Data Of Owners
//   if (!listing) {
//     req.flash("error", "Listing Does Not Exist..!!"); // Flash Message
//     res.redirect("/listings");
//   }
//   res.render("listings/show.ejs", { listing });
// })
// );

// // 4. Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
// wrapAsync(async (req, res) => {
//   // if(!req.body.listing){ // For Single Error Handling
//   //   throw new ExpressError(400, "Send Valid Data For Listing")
//   // }
//   // let {title, description, image, price, country, location} = req.body;
//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   await newListing.save();
//   req.flash("success", "New Listing Created..!!"); // Flash Message
//   res.redirect("/listings");
// })
// );

// // 5. Edit Route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
// wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// })
// );

// // 6. Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
// wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruct
//   req.flash("success", "Listing Updated..!!"); // Flash Message
//   if (!listing) {
//     req.flash("error", "Listing Does Not Exist..!!"); // Flash Message
//     res.redirect("/listings");
//   }
//   res.redirect(`/listings/${id}`);
// })
// );

// // 7. Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
// wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash("success", "Listing Deleted..!!"); // Flash Message
//   res.redirect("/listings");
// })
// );

// module.exports = router;
