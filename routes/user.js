const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignUpForm) // 1. SignUp Form
  .post(wrapAsync(userController.signup)); // 2. SignUp

router
  .route("/login")
  .get(userController.renderLoginForm) // 3. Login Form
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  ); // 4. Login

router.get("/logout", userController.logout); // 5. Logout

module.exports = router;

// ------------------------------------------------------------------------------------------

// // 1. SignUp Form
// router.get("/signup", (req, res) => {
//   res.render("users/signup.ejs");
// });

// // 2. SignUp
// router.post(
//   "/signup",
//   wrapAsync(async (req, res) => {
//     try {
//       let { username, email, password } = req.body;
//       const newUser = new User({ email, username });
//       const registerdUser = await User.register(newUser, password);
//       console.log(registerdUser);
//       req.login(registerdUser, (err) =>{ // Login with signUp
//         if(err){
//           return next(err);
//         }
//         req.flash("success", "WellCome to WanderLust!");
//         res.redirect("/listings");
//       });
//     } catch (e) {
//       req.flash("error", e.message);
//       res.redirect("/signup");
//     }
//   })
// );

// // 3. Login Form
// router.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });

// // 4. Login
// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "WellCome Back to WanderLust");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
//   }
// );

// // 5. Logout
// router.get("/logout", (req,res) => {
//   req.logOut((err) =>{
//     if(err){
//       return next(err);
//     }
//     req.flash("success", "You Are Logged Out!");
//     res.redirect("/listings");
//   })
// });

// module.exports = router;
