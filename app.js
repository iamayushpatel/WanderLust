// 1. npm init -y
// 2. Create app.js
// 3. npm i express
// 4. npm i ejs
// 5. npm i mongoose

// init : To add data into datbase
// models : To create schema in datbase
// view : To create ejs file

// 1. npm i ejs-mate : Template functions for the EJS template engine.
// const ejsMate = require("ejs-mate");
// app.engine("ejs", ejsMate);
// <%- include("../includes/navbar.ejs") %>
// 2. npm i joi : The most powerful schema description language and data validator for JavaScript.

if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require('./routes/listing.js');
const reviewRouter = require("./routes/review.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const DB_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected To DB..!!");
  })
  .catch((err) => console.log(err));

async function main() {
  // await mongoose.connect(MONGO_URL);
  await mongoose.connect(DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
      secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // 2 Hour
});

store.on("error" , () => {
  console.log("ERROR In MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
      expires : Date.now() + 7*24*60*60*1000,
      maxAge :  7*24*60*60*1000,
      httpOnly : true,
  }, 
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//demo useer
// app.get("/demouser", async (req , res ) => {
//     let fakeUser = new User({
//         email :"student@gmail.com",
//         username :"Ayush"
//     });
//     let registerdUser = await User.register(fakeUser, "helloworld");
//     res.send(registerdUser);
// });

// app.get("/", (req, res) => {
//   res.send("Root..!!");
// });

app.get('/', (req, res) => {
  // Redirect to new page
  res.redirect('/listings');
});

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Express express.Router() Function :-
// The express.Router() function in Express.js creates a new router object that can handle requests in a modular and organized way.
// Create routes folder.

// Restructuirng listings 
app.use("/listings",listingRouter);
// Restructuring reviews
app.use("/listings/:id/reviews" ,reviewRouter);
app.use("/",userRouter);


// Error Handler Middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

let port = 8080;
app.listen(port, () => {
  console.log(`App is listning on Port : ${port}`);
});

// ---------------------------------------------------------------------------------

// Cookies :-
// HTTP cookies (also called web cookies, Internet cookies, browser cookies, or simply cookies) are small blocks of data created by a web server while a user is browsing a website.

// Cookie-Parser :- 
// npm i cookie-parser

// const cookieParser = require('cookie-parser');
// app.use(cookieParser("anysecretcode"));

// app.get("/signedcookie", (req,res) => {
//   res.cookie("Name", "Ayush", {signed:true});
//   res.send("signed cookie sent");
// });
// app.get("/verify", (req,res) => {
//   // console.log(req.cookies);
//   console.log(req.signedCookies);      // O/P : {}
//   res.send("Verified");
// });

// Stateful Protocol : -
// Definition: In a stateful protocol, the server retains information about the state of the conversation or session between client and server. This means that the server "remembers" previous interactions and can use that data to influence future communication.
// Example: FTP

// Stateless Protocol :-
// Definition: In a stateless protocol, each request from a client to a server is independent. The server doesn't retain any information about previous interactions. Every request is treated as a new, isolated event.
// Example: HTTP

// Express-Session :-
// Create a session middleware with the given options.
// Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// npm i express-session

// Connect-Flash :-
// The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. 
// npm i connect-flash
// First use session then use flash.

// Passport :-
// Passport is Express-compatible authentication middleware for Node.js.
// npm i pssport
// npm i passport-local
// npm i passport-local-mongoose

// Connect-mongo :-
// MongoDB session store for Connect and Express written in Typescript.
// npm i connect-mongo

// ---------------------------------------------------------------------------------

// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
// const wrapAsync = require("./utils/wrapAsync.js");
// const Listing = require("./models/listing.js");

// const validateListing = (req, res, next) => {
//   let error = listingSchema.validate(req.body);
//   // console.log(error);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//     // throw new ExpressError(400, error);
//   } else {
//     next();
//   }
// };

// const validateReview = (req, res, next) => {
//   let error = reviewSchema.validate(req.boHdy);
//   // console.log(error);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//     // throw new ExpressError(400, error);
//   } else {
//     next();
//   }
// };

// ---------------------------------------------------------------------------------

// // // 1. Index Route
// // app.get("/listings", async (req, res) => {
// //   const allListings = await Listing.find({});
// //   res.render("listings/index.ejs", { allListings });
// // });

// // 1. Index Route
// app.get(
//   "/listings",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//   })
// );

// // 3. New Route
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// // 2. Show Route
// app.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews"); // populate("reviews") : Give Object Data Of Reviews
//     res.render("listings/show.ejs", { listing });
//   })
// );

// // 4. Create Route
// app.post(
//   "/listings",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     // if(!req.body.listing){ // For Single Error Handling
//     //   throw new ExpressError(400, "Send Valid Data For Listing")
//     // }
//     // let {title, description, image, price, country, location} = req.body;
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );

// // 5. Edit Route
// app.get(
//   "/listings/:id/edit",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
//   })
// );

// // 6. Update Route
// app.put(
//   "/listings/:id",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruct
//     res.redirect(`/listings/${id}`);
//   })
// );

// // 7. Delete Route
// app.delete(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
//   })
// );

// ---------------------------------------------------------------------------------

// // 8. Reviews Submit Route
// app.post(
//   "/listings/:id/reviews",
//   validateReview,
//   wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     Listing.reviews.push(newReview);

//     await newReview.save();
//     await Listing.save();

//     console.log("New Review Saved..!!");
//     res.redirect(`/listings/${Listing._id}`);
//   })
// );

// // 9. Reviews Delete Route
// app.delete(
//   "/listings/:id/reviews/reviewId",
//   wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull: {review:reviewId}}); // Delete From Listing
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${Listing._id}`);
//   })
// );

// ---------------------------------------------------------------------------------

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });


// ---------------------------------------------------------------------------------

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page not found!"));
// });

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("error.ejs", { message });
//   // res.status(statusCode).send(message);
// });

// let port = 8080;
// app.listen(port, () => {
//   console.log(`App is listning on Port : ${port}`);
// });