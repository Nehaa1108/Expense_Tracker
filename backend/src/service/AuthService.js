const bcrypt      = require('bcryptjs');
const jwt         = require('jsonwebtoken');
const User        = require('../models/User');
const generateOtp = require('../utils/generateOtp');
const sendEmail   = require('../utils/sendEmail');

const authService = {

 
  signup: async ({ name, email, password }) => {

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    // User.findOne({ email }) is the same as:
    // "find one document in the users collection where email = email"
    // Returns the document if found, or null if not found
    // await is needed because this is a database query (async operation)

    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // 2. Hash the password
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate OTP before creating user
    const { otp, otpExpiry } = generateOtp();

    // 4. Create the user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      // We pass otp and otpExpiry directly at creation
      // instead of updating after — one database call instead of two
    });
    // User.create() inserts a new document into the users collection
    // Mongoose validates the data against our schema before saving
    // Returns the created document including the _id MongoDB generated

    // 5. Send OTP email
    await sendEmail({
      to:      email,
      subject: 'Verify your email — OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Welcome!</h2>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>This code expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    return {
      success: true,
      message: 'Account created. Check your email for the OTP.',
      userId:  user._id.toString(),
      // MongoDB auto-generates _id for every document
      // It's an ObjectId type — .toString() converts it to a plain string
      // so it's easy to pass between frontend and backend
    };
  },

  // ══════════════════════════════════════════════════════════════
  // VERIFY OTP
  // ══════════════════════════════════════════════════════════════
  verifyOtp: async ({ userId, otp }) => {

    const user = await User.findById(userId);
    // User.findById() is shorthand for User.findOne({ _id: userId })
    // MongoDB's _id field is special — findById handles type conversion

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }

    if (new Date() > user.otpExpiry) {
      return { success: false, message: 'OTP expired. Request a new one.' };
    }

    // Mark as verified and clear OTP fields
    user.isVerified = true;
    user.otp        = null;
    user.otpExpiry  = null;
    await user.save();
    // user.save() updates the document in MongoDB
    // We modify the fields directly on the user object then call save()
    // Mongoose tracks what changed and only updates those fields

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      success: true,
      message: 'Email verified successfully',
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
      },
    };
  },

  // ══════════════════════════════════════════════════════════════
  // LOGIN
  // ══════════════════════════════════════════════════════════════
  login: async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (!user.isVerified) {
      return { success: false, message: 'Please verify your email first' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
      },
    };
  },

  // ══════════════════════════════════════════════════════════════
  // FORGOT PASSWORD
  // ══════════════════════════════════════════════════════════════
  forgotPassword: async ({ email }) => {

    const user = await User.findOne({ email });
    if (!user) {
      // Always return same message — don't reveal if email exists
      return { success: true, message: 'If this email exists, a reset code has been sent.' };
    }

    const { otp, otpExpiry } = generateOtp();

    user.resetToken  = otp;
    user.resetExpiry = otpExpiry;
    await user.save();

    await sendEmail({
      to:      email,
      subject: 'Password Reset Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Reset Your Password</h2>
          <p>Your reset code is:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>Expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    return {
      success: true,
      message: 'If this email exists, a reset code has been sent.',
      userId:  user._id.toString(),
    };
  },

  // ══════════════════════════════════════════════════════════════
  // RESET PASSWORD
  // ══════════════════════════════════════════════════════════════
  resetPassword: async ({ userId, otp, newPassword }) => {

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'Invalid request' };
    }

    if (user.resetToken !== otp) {
      return { success: false, message: 'Invalid or expired reset code' };
    }

    if (new Date() > user.resetExpiry) {
      return { success: false, message: 'Reset code expired. Please request a new one.' };
    }

    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password    = hashedPassword;
    user.resetToken  = null;
    user.resetExpiry = null;
    await user.save();

    return {
      success: true,
      message: 'Password reset successfully. You can now log in.',
    };
  },

  // ══════════════════════════════════════════════════════════════
  // RESEND OTP
  // ══════════════════════════════════════════════════════════════
  resendOtp: async ({ userId, type }) => {

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const { otp, otpExpiry } = generateOtp();

    if (type === 'reset') {
      user.resetToken  = otp;
      user.resetExpiry = otpExpiry;
    } else {
      user.otp       = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();

    await sendEmail({
      to:      user.email,
      subject: type === 'reset' ? 'New Password Reset Code' : 'New Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <h2>Your new code:</h2>
          <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
          <p>Expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    return { success: true, message: 'New OTP sent to your email.' };
  },
};

module.exports = authService;