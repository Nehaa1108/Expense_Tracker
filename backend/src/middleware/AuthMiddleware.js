const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // next is a function — calling next() means "go to the route handler"
  // If we don't call next(), the request stops here

  try {
    // 1. Get token from the Authorization header
    const authHeader = req.headers.authorization;
    // Frontend sends: Authorization: Bearer eyJhbGci...
    // req.headers.authorization gives us the whole string

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1];
    // Split "Bearer eyJhbGci..." by space → ["Bearer", "eyJhbGci..."]
    // [1] gets the second part — the actual token

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // jwt.verify() checks:
    //   a) Was this token signed with our JWT_SECRET? (not fake)
    //   b) Has it expired?
    // If either fails, it throws an error — caught below
    // If valid, decoded = { id: "123", email: "a@b.com", iat: ..., exp: ... }

    // 3. Attach user info to the request
    req.user = decoded;
    // Now any route handler after this middleware can use req.user.id
    // Example: "give me the profile of req.user.id"

    next();
    // All checks passed — move on to the route handler

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please log in.' });
  }
};

module.exports = protect;