const crypto = require('crypto');
// crypto is built into Node.js — no install needed
// It gives us cryptographically secure random numbers
// Never use Math.random() for OTPs — it's predictable

const generateOtp = () => {
  // crypto.randomInt(min, max) returns a random integer
  // between min (inclusive) and max (exclusive)
  const otp = crypto.randomInt(100000, 999999).toString();
  // 100000 to 999999 = always a 6-digit number
  // .toString() so we store and compare it as a string

  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  // OTP expires in 10 minutes
  // Date.now() = current time in milliseconds
  // 10 * 60 * 1000 = 10 minutes in milliseconds
  // new Date() wraps it into a proper Date object

  return { otp, otpExpiry };
  // Return both the OTP and its expiry time
  // The service will store both in the user record
};

module.exports = generateOtp;