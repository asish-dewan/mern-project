const jwt = require('jsonwebtoken');

// set expiration date 

const expiration = '1h';

module.exports = {
    authMiddleware: function (req, res, next) {
        // allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return res.status(400).json({ message: 'You have no token!'});
        }

        // Verify token and get user data
        try {
            const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log ('Invalid Token');
            return res.status(400).json ({ message: 'Invalid Token!'});
        }

        // Direct to next endpoint 
        next();
    },

    signToken: function ({ email, password }) {
        const payload = { email, password };

        return jwt.sign({ data: payload}, process.env.JWT_SECRET, { expiresIn: expiration });
    },
};
