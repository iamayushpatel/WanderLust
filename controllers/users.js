const User = require("../models/user.js");

// 1. SignUp Form
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

// 2. SignUp
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    req.login(registerdUser, (err) => {
      // Login with signUp
      if (err) {
        return next(err);
      }
      req.flash("success", "WellCome To WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// 3. Login Form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// 4. Login
module.exports.login = async (req, res) => {
  req.flash("success", "WellCome Back To WanderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// 5. Logout
module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You Are Logged Out!");
    res.redirect("/listings");
  });
};