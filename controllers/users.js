const User = require("../models/user.js");
const { verifyOTP } = require("../controllers/otpService");

// 1. SignUp Form
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

// 2. SignUp
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password, otp } = req.body;

    // Verify OTP
    const otpResult = verifyOTP(email, otp);
    if (!otpResult.success) {
      return res.json({ success: false, message: "Invalid OTP! Try again." });
    }

    console.log("OTP Verified. Proceeding with signUp");

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already in use!" });
    }

    // Register the user in MongoDB
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log("User Registered:", registeredUser);

    // Auto-login the user after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log("User logged in. Redirecting...");
      res.json({
        success: true,
        message: "SignUp successful!",
        redirectUrl: "/listings",
      });
    });
  } catch (e) {
    console.error("Error in SignUp:", e);
    res.json({ success: false, message: e.message });
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
