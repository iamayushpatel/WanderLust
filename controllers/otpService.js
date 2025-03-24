const nodemailer = require("nodemailer");

let otpStore = {}; // Temporary store

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

async function sendOTP(email) {
  if (otpStore[email] && otpStore[email].expiry > Date.now()) {
    return { success: false, message: "OTP already sent! Try again later." };
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const expiryTime = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  otpStore[email] = { otp, expiry: expiryTime, attempts: 0 };

  console.log(`Generated OTP for ${email}: ${otp}`);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // HTML Email Format
  const emailHTML = `
<html>
<body style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
<div style="max-width: 500px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin: auto;">
<h2>Verify Your Email</h2>
<p>Hello,</p>
<p>Your OTP for verifying your email on <b>WanderLust</b> is:</p>
<p style="font-size: 24px; font-weight: bold; color: #007bff;"> <b>${otp}</b> </p>
<p>This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.</p>
<p>If you did not request this, please ignore this email.</p>
<hr>
<p style="font-size: 12px; color: #555;">If you need help, contact us at <a href="mailto:support@wanderlust.com">support@wanderlust.com</a></p>
</div>
</body>
</html>`;

  let mailOptions = {
    from: `"WanderLust Support" <${process.env.EMAIL}>`,
    to: email,
    subject: "Your OTP Code - WanderLust Email Verification",
    html: emailHTML, // Sending HTML content instead of plain text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP ${otp} sent to ${email}`);
    return { success: true, message: "OTP sent successfully." };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Error sending OTP! Try again." };
  }
}

function verifyOTP(email, otp) {
  console.log(`Verifying OTP for: ${email}, Entered OTP: ${otp}`);

  if (!otpStore[email]) {
    console.log("No OTP found for this email.");
    return { success: false, message: "No OTP request found for this Email." };
  }

  const { otp: storedOtp, expiry } = otpStore[email];

  console.log(
    `Stored OTP: ${storedOtp}, Expiry: ${expiry}, Current Time: ${Date.now()}`
  );

  if (Date.now() > expiry) {
    console.log("OTP expired.");
    delete otpStore[email]; // OTP expired
    return { success: false, message: "OTP has expired. Request a new one." };
  }

  if (storedOtp == otp) {
    console.log("OTP verified successfully.");

    // Mark OTP as verified instead of deleting it immediately
    otpStore[email].verified = true;

    return { success: true, message: "OTP verified successfully." };
  }

  console.log("Invalid OTP entered.");
  return { success: false, message: "Invalid OTP! Try again." };
}

module.exports = { sendOTP, verifyOTP };
