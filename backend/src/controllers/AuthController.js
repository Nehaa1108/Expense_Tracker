const authService = require('../services/authService');
// Import our service — all logic lives there

const authController = {

  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // req.body contains what the frontend sent as JSON
      // express.json() middleware parsed it for us

      // Basic validation — check required fields exist
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
        // 400 = Bad Request — the frontend sent incomplete data
        // return stops execution — we don't continue after sending response
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const result = await authService.signup({ name, email, password });

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(201).json(result);
      // 201 = Created — something new was made (a new user)
      // 200 = OK for general success, 201 specifically for creation

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
      // 500 = Internal Server Error — unexpected crash
      // We never send the real error message to frontend (security)
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { userId, otp } = req.body;

      if (!userId || !otp) {
        return res.status(400).json({ message: 'userId and otp are required' });
      }

      const result = await authService.verifyOtp({ userId, otp });

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(200).json(result);

    } catch (error) {
      console.error('VerifyOtp error:', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await authService.login({ email, password });

      if (!result.success) {
        return res.status(401).json({ message: result.message });
        // 401 = Unauthorized — wrong credentials
      }

      res.status(200).json(result);

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const result = await authService.forgotPassword({ email });
      res.status(200).json(result);
      // Always 200 here — we don't reveal if email exists or not

    } catch (error) {
      console.error('ForgotPassword error:', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { userId, otp, newPassword } = req.body;

      if (!userId || !otp || !newPassword) {
        return res.status(400).json({ message: 'userId, otp and newPassword are required' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const result = await authService.resetPassword({ userId, otp, newPassword });

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(200).json(result);

    } catch (error) {
      console.error('ResetPassword error:', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  },

  resendOtp: async (req, res) => {
    try {
      const { userId, type } = req.body;

      if (!userId || !type) {
        return res.status(400).json({ message: 'userId and type are required' });
      }

      const result = await authService.resendOtp({ userId, type });

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(200).json(result);

    } catch (error) {
      console.error('ResendOtp error:', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  },
};

module.exports = authController;