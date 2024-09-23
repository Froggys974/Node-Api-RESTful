const jwt = require("jsonwebtoken");

function checkAuth (req, res, next) {
    if(!("authorization" in req.headers)) return res.status(401).json({ message : 'no Autorization' });
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!("email" in decoded)) return res.status(400).json({ message : 'no good token'})
    req.auth = decoded.email
    next()
  
}

module.exports = checkAuth