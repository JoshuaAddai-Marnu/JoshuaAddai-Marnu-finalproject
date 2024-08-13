const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'JB APP PASSWORD', (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = { authenticateJWT }