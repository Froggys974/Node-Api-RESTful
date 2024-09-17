const roleMiddleware = (roles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized: No user role found." });
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: You do not have the required permissions." });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  