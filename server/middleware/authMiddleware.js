const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.sessionId;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access. Please login.', redirect: '/login' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access. Please login.', redirect: '/login' });
  }
};

const checkUserType = (requiredType) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(400).send('User not found in request.');
    }
    if (req.user.userType === requiredType) {
      console.log(`User is of type ${requiredType}`);
      next();
    } else {
      res.status(403).send(`Access denied. User is not of type ${requiredType}.`);
    }
  };
};

module.exports = {authMiddleware, checkUserType};
