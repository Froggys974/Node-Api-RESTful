// middlewares/authorizationMiddleware.js
const authorizationMiddleware = async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
  
    // Vérifie si l'utilisateur authentifié est celui qui est demandé
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
    }
  
    next();
  };
  
  module.exports = authorizationMiddleware;
  