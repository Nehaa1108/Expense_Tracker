const bcrypt      = require('bcryptjs');
// bcrypt turns a password like "hello123" into "$2a$10$xyz..."
// It's one-way — you can never reverse it back to "hello123"
// To verify: bcrypt.compare("hello123", hashedVersion)

const jwt         = require('jsonwebtoken');
// jwt creates a token like "eyJhbGciOiJIUzI1NiJ9..."
// The token contains the user's id — encoded but readable
// Only someone with JWT_SECRET can verify it's genuine

const User        = require('../models/User');
const generateOtp = require('../utils/generateOtp');
const sendEmail   = require('../utils/sendEmail');

const authService = {

  // ══════════════════════════════════════════════════════════════
  // SIGNUP
  // ══════════════════════════════════════════════════════════════
  signup: async ({ name, email, password }) => {

    // 1. Check if email already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
      // We return an object with success:false instead of throwing
      // The controller will check this and send the right HTTP status
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    // genSalt(10) creates a random "salt" — extra random data added to
    // the password before hashing. 10 = cost factor (how slow the hash is)
    // Slower = harder for hackers to brute-force. 10 is the standard.

    const hashedPassword = await bcrypt.hash(password, salt);
    // hash() combines password + salt and runs the bcrypt algorithm
    // Result: "$2a$10$randomsalthere...hashedvalue"
    // This is what gets saved in the database

    // 3. Create the user
    const user = User.create({ name, email, password: hashedPassword });
    // Note: we store hashedPassword, never the original password

    // 4. Generate OTP and save it to the user
    const { otp, otpExpiry } = generateOtp();
    User.update(user.id, { otp, otpExpiry });
    // Update the user record with the OTP and its expiry time

    // 5. Send OTP email
    await sendEmail({
      to: email,
      subject: 'Verify your email — OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Welcome to the App!</h2>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p>If you didn't create an account, ignore this email.</p>
        </div>
      `,
    });

    return {
      success: true,
      message: 'Account created. Please verify your email with the OTP sent.',
      userId: user.id,
      // We return userId so the frontend knows which user to verify
    };
  },

  // ══════════════════════════════════════════════════════════════
  // VERIFY OTP
  // ══════════════════════════════════════════════════════════════
  verifyOtp: async ({ userId, otp }) => {

    const user = User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check OTP matches
    if (user.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
      // String comparison — both are stored as strings
    }

    // Check OTP hasn't expired
    if (new Date() > new Date(user.otpExpiry)) {
      return { success: false, message: 'OTP has expired. Please request a new one.' };
      // new Date() = now. If now is after expiry, the OTP is dead.
    }

    // Mark user as verified and clear OTP fields
    User.update(user.id, {
      isVerified: true,
      otp:        null,
      otpExpiry:  null,
      // Clear OTP after use — can't be reused
    });

    // Create JWT token — user is now logged in
    const token = jwt.sign(
      { id: user.id, email: user.email },
      // Payload: data encoded inside the token
      // Don't put passwords or sensitive data here

      process.env.JWT_SECRET,
      // Secret key — used to sign and verify the token
      // If someone changes the payload, the signature breaks

      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      // Token expires in 7 days — user must log in again after that
    );

    return {
      success: true,
      message: 'Email verified successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
      // Never return the password — even hashed
    };
  },

  // ══════════════════════════════════════════════════════════════
  // LOGIN
  // ══════════════════════════════════════════════════════════════
  login: async ({ email, password }) => {

    // 1. Find user
    const user = User.findByEmail(email);
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
      // We say "email or password" on purpose — don't tell hackers
      // whether the email exists or not
    }

    // 2. Check if verified
    if (!user.isVerified) {
      return { success: false, message: 'Please verify your email first' };
    }

    // 3. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    // bcrypt.compare() hashes the input and compares with stored hash
    // Returns true or false — never exposes the original password
    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    // 4. Create and return JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  },

  // ══════════════════════════════════════════════════════════════
  // FORGOT PASSWORD — sends OTP to email
  // ══════════════════════════════════════════════════════════════
  forgotPassword: async ({ email }) => {

    const user = User.findByEmail(email);
    if (!user) {
      // Security tip: don't reveal if email exists or not
      // Always return the same message either way
      return { success: true, message: 'If this email exists, a reset code has been sent.' };
    }

    const { otp, otpExpiry } = generateOtp();
    User.update(user.id, {
      resetToken:  otp,
      resetExpiry: otpExpiry,
      // We use resetToken/resetExpiry fields instead of otp/otpExpiry
      // so signup OTP and reset OTP don't overwrite each other
    });

    await sendEmail({
      to: email,
      subject: 'Password Reset Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Reset Your Password</h2>
          <p>Your password reset code is:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    return {
      success: true,
      message: 'If this email exists, a reset code has been sent.',
      userId: user.id,
      // Return userId so frontend can pass it in the reset step
    };
  },

  // ══════════════════════════════════════════════════════════════
  // RESET PASSWORD — verify OTP then set new password
  // ══════════════════════════════════════════════════════════════
  resetPassword: async ({ userId, otp, newPassword }) => {

    const user = User.findById(userId);
    if (!user) {
      return { success: false, message: 'Invalid request' };
    }

    // Verify reset token
    if (user.resetToken !== otp) {
      return { success: false, message: 'Invalid or expired reset code' };
    }

    if (new Date() > new Date(user.resetExpiry)) {
      return { success: false, message: 'Reset code has expired. Please request a new one.' };
    }

    // Hash new password
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user — new password + clear reset fields
    User.update(user.id, {
      password:    hashedPassword,
      resetToken:  null,
      resetExpiry: null,
    });

    return {
      success: true,
      message: 'Password reset successfully. You can now log in.',
    };
  },

  // ══════════════════════════════════════════════════════════════
  // RESEND OTP — for both signup and forgot-password
  // ══════════════════════════════════════════════════════════════
  resendOtp: async ({ userId, type }) => {
    // type = 'verify' (signup) or 'reset' (forgot password)

    const user = User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const { otp, otpExpiry } = generateOtp();

    if (type === 'reset') {
      User.update(user.id, { resetToken: otp, resetExpiry: otpExpiry });
    } else {
      User.update(user.id, { otp, otpExpiry });
    }

    await sendEmail({
      to: user.email,
      subject: type === 'reset' ? 'New Password Reset Code' : 'New Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Your new code is:</h2>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>Expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    return { success: true, message: 'New OTP sent to your email.' };
  },
};

module.exports = authService;