const jwt = require('jsonwebtoken');

// Token Secret
const secret = 'cr7>ms!';
// set expiration date 
const expiration = '1h';

module.exports = {
    authMiddleware: function ({req}, res, next) {
        // allows token to be sent via req.query or headers
        console.log(req.body.token)
        console.log(req.query.token)
        console.log(req.headers.authorization)
        
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ')
            .pop()
            .trim();
        }

        if (!token) {
            return req;
            //return res.status(400).json({ message: 'You have no token!'});
        }

        // Verify token and get user data
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log ('Invalid Token');
            //return res.status(400).json ({ message: 'Invalid Token!'});
        }

        // Direct to next endpoint 
        return req;
    },

    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
};
