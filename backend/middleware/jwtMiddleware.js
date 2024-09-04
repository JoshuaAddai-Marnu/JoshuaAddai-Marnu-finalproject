// Importing the 'jsonwebtoken' package to handle JWT (JSON Web Token) operations.
const jwt = require('jsonwebtoken');

// Middleware function to authenticate incoming requests using JWT.
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the 'Authorization' header exists.
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Verify the token using the 'JB APP PASSWORD' secret key.
        jwt.verify(token, 'JB APP PASSWORD', (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }

            // If the token is valid, attach the user data to the request object.
            req.user = user;
            next();
        });
    } else {
        // If the 'Authorization' header is missing, return a 401 Unauthorized status.
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = { authenticateJWT }