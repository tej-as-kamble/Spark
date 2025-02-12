const jwt = require('jsonwebtoken');

function authorizeJWT(req, res, next) {
    // console.log(req.cookies);
    const token = req.cookies?.token;
    // console.log("token:-" ,token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id == "admin") req.body.isAdmin = true;
        else{
            req.body.username = decoded.id;
            req.body.isAdmin = false;
        }
        // console.log(req.body.username);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
}

module.exports = authorizeJWT;
